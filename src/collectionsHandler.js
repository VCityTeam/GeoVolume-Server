const fs = require("fs");
const boxIntersect = require("box-intersect");
const GeoVolume = require("./GeoVolume");

const indexPath = "../assets/index.html";

class CollectionsHandler {

    constructor(path) {
      this.path = path;
      this.collectionsJson;
      this.collections;

      this.getCollectionsFromJson();

    }

    getCollections() {
      return this.collections;
    }

    getCollectionsFromJson(){
        let collectionArray = new Array();
        this.getAssetsFromJson().then(result => {
          if(result) {
              this.collectionsJson = result;
              for(let el of this.collectionsJson.collections){
                collectionArray.push(new GeoVolume(el));
              }
              this.collections = collectionArray;
            }
        });
    }

    getAssetsFromJson() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, (err, data) => {
              if (err) {
                reject();
              }
              resolve(JSON.parse(data));
            });
          });
    }

    getGeovolumeInCollections(id){
      for(let c of this.collections){
        if(c.id == id)
          return c;
      }
      return false;
    }

    buildBboxFromUrlQuery(bboxAsQuery){
      let splitedQuery = bboxAsQuery.split(',');
      if(splitedQuery.length != 4 && splitedQuery.length != 6)
        return null;
      var bbox = new Array();
      for (let value of splitedQuery){
        bbox.push(parseFloat(value));
      }
      return bbox; 
    }

    clearNonIntersectingGeoVolumeChildren(geoVolume,bbox,crs){
      if (geoVolume.children){
        let children_intersecting = new Array();
        for(let child of geoVolume.children){
          if (child.isExtentInstersectingWithBbox(bbox,crs)){
            this.clearNonIntersectingGeoVolumeChildren(child,bbox,crs)
            children_intersecting.push(child);
          }
        }
        geoVolume.children = children_intersecting;
      }
      return geoVolume;
    }

    getGeoVolumeFromBboxAsQuery(geovolumes, urlQuery){
      if(!geovolumes) return null;
      let bbox = this.buildBboxFromUrlQuery(urlQuery.bbox);
      if(!bbox) return null;
      let crs = urlQuery.crs;
      let intersectingGeoVolumes; 
      for(let geoVolume of geovolumes){
        let tmp;
        if(geoVolume.isBboxContainedInExtent(bbox,crs))
            tmp = geoVolume.getGeovolumeContainingBbox(bbox,crs);
        else if(geoVolume.isInstersectingWithBbox(bbox,crs))
            tmp = geoVolume;
        
        if(tmp) {
          tmp = this.clearNonIntersectingGeoVolumeChildren(tmp,bbox,crs);
          if(!intersectingGeoVolumes) intersectingGeoVolumes = new Array();
          intersectingGeoVolumes.push(tmp);
        }
      }

      return intersectingGeoVolumes;
    }

    getGeoVolumesFromPath(path) {
      if(path == '' || path == '/')
        return this.collections;
      let ids = path.split('/');
      let geoVolume;
      for(let id of ids){
        if(!geoVolume) {
          geoVolume = this.getGeovolumeInCollections(id);
          if(!geoVolume) return null;
        } 
        else {
          if(geoVolume.hasChildById(id)){
            geoVolume = geoVolume.getChildById(id);
          }
          else return null;
        }
      }
      return geoVolume;
    }
    
  
    // getPublicLayers() {
    //   return new Promise((resolve, reject) => {
    //     fs.readFile(this.path, (err, data) => {
    //       let assets = JSON.parse(data);
    //       assets = assets.filter(asset => asset.scope == "public");
    //       resolve(assets);
    //     });
    //   });
    // }
  
    // isPublic(url) {
    //   return new Promise((resolve, reject) => {
    //     fs.readFile(this.path, (err, data) => {
    //       let assets = JSON.parse(data);
    //       assets = assets.filter(asset => {
    //         let parentDir = path.dirname(asset.url);
    //         return !path.relative(parentDir, url).startsWith("..");
    //       });
    //       if (assets.length == 0) {
    //         resolve(false);
    //         return;
    //       }
    //       if (!assets[0].scope == "public") {
    //         resolve(false);
    //         return;
    //       }
    //       resolve(true);
    //     });
    //   });
    // }
  
    getIntersectingLayers(ids, bb) {
  
    //   return new Promise((resolve, reject) => {
    //     fs.readFile(this.path, (err, data) => {
    //       if (err) {
    //         reject();
    //       }
    //       let assets = JSON.parse(data);
    //       let requestedBB = bb.split(",").map(token => parseFloat(token));
    //       let requestedLayers = ids.split(",");
  
    //       assets = assets.filter(asset => requestedLayers.includes(asset.id));
    //       assets = assets.filter(asset => asset.scope == "public");
  
    //       assets = assets.filter(asset => {
  
    //         let overlaps = boxIntersect([
    //           [...asset.boundingbox],
    //           [...requestedBB]
    //         ]);
  
    //         if (overlaps.length > 0) {
    //           return true;
    //         }
    //         return false;
    //       });
  
    //       resolve(assets);
  
    //     });
    //   });
  
    }
  }
  
  module.exports = CollectionsHandler;