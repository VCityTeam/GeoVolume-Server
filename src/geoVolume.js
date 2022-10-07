var boxIntersect = require("box-intersect");
var proj4 = require("proj4");
class GeoVolume {
  constructor(jsonObject) {
    this.id = jsonObject.id;
    this.title = jsonObject.title;
    this.collectionType = jsonObject.collectionType;
    this.extent = jsonObject.extent;
    this.links = jsonObject.links;
    this.content = jsonObject.content;
    this.children = this.fillChildren(jsonObject.children);
  }

  getSelfHref() {
    for (let link of this.links) {
      if (link.rel == "self") {
        return link.href;
      }
      return "";
    }
  }

  isExtentInstersectingWithBbox(bbox, crs) {
    let bboxReprojected = this.reprojectBbox(bbox, crs);
    let extentBbox = this.extent.spatial.bbox;
    return boxIntersect([bboxReprojected, extentBbox]).length > 0;
  }

  reprojectBbox(bbox, crs) {
    let sourceCrs = crs ? crs : "EPSG:4326";
    let destCrs = this.extent.spatial.crs
      ? this.extent.spatial.crs
      : "EPSG:4326";
    let minBbox, maxBbox;
    if (bbox.length == 6) {
      minBbox = proj4(sourceCrs, destCrs).forward([bbox[0], bbox[1], bbox[2]]);
      maxBbox = proj4(sourceCrs, destCrs).forward([bbox[3], bbox[4], bbox[5]]);
    } else {
      minBbox = proj4(sourceCrs, destCrs).forward([bbox[0], bbox[1]]);
      maxBbox = proj4(sourceCrs, destCrs).forward([bbox[2], bbox[3]]);
    }
    return minBbox.concat(maxBbox);
  }

  isBboxContainedInExtent(bbox, crs) {
    let bboxReprojected = this.reprojectBbox(bbox, crs);
    let extentBbox = this.extent.spatial.bbox;
    return (
      extentBbox[0] <= bboxReprojected[0] &&
      extentBbox[1] <= bboxReprojected[1] &&
      extentBbox[3] >= bboxReprojected[3] &&
      extentBbox[4] >= bboxReprojected[4]
    );
  }

  getGeovolumeContainingBbox(bbox, crs) {
    if (this.children) {
      for (let child of this.children) {
        if (child.isBboxContainedInExtent(bbox, crs))
          return child.getGeovolumeContainingBbox(bbox, crs);
      }
    }
    return this;
  }

  fillChildren(jsonChildren) {
    let childrenArray = new Array();
    if (jsonChildren) {
      for (let child of jsonChildren) {
        childrenArray.push(new GeoVolume(child));
      }
    }
    return childrenArray;
  }

  hasChildById(id) {
    if (this.children) {
      for (let child of this.children) {
        if (child.id == id) return true;
      }
    }
    return false;
  }

  getChildById(id) {
    if (this.children) {
      for (let child of this.children) {
        if (child.id == id) return child;
      }
    }
    return false;
  }
}

module.exports = GeoVolume;
