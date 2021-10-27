var boxIntersect = require('box-intersect')

class GeoVolume {
    constructor(jsonObject){
        this.id = jsonObject.id;
        this.title = jsonObject.title;
        this.collectionType = jsonObject.collectionType;
        this.extent = jsonObject.extent;
        this.links = jsonObject.links;
        this.content = jsonObject.content;
        this.children = this.fillChildren(jsonObject.children);
    }

    isInstersectingWithBbox(bbox,epsg){
        console.log(this.extent.spatial.bbox);
        console.log(this.extent.spatial.epsg);
    }

    isBboxContainedInExtent(bbox,epsg){
        console.log(this.extent.spatial.bbox);
        console.log(this.extent.spatial.epsg);
    }

    getGeovolumeContainingBbox(bbox,epsg){
        if(this.children){
            for(let child of this.children){
                if(child.isBboxContainedInExtent)
                    return child.getChildContainingBbox(bbox,epsg);
            }
        }
        return this;
    }

    fillChildren(jsonChildren) {
        let childrenArray = new Array();
        if(jsonChildren){
            for(let child of jsonChildren){
                childrenArray.push(new GeoVolume(child));
            }
        }
        return childrenArray;
    }

    hasChildById(id){
        if(this.children){
            for(let child of this.children){
                if(child.id == id)
                    return true;
            }
        }
        return false;
    }

    getChildById(id)
    {
        if(this.children){
            for(let child of this.children){
                if(child.id == id)
                    return child;
           }
        }
        return false;
    }
}

module.exports = GeoVolume;