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

    getGeoVolumeFromPath(path) {
      let ids = path.split('/');
      let geoVolume;
      for(let id of ids){
        if(id == '') continue;
        if(!geoVolume) geoVolume = this.getGeovolumeInCollections(id);
        else {
          if(geoVolume.hasChildById(id)){
            geoVolume = geoVolume.getChildById(id);
          }
          else return false;
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