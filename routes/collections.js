const express = require("express");
const pug = require("pug")

const pathToCollections = "./assets/collections.json";

const CollectionsHandler = require("../src/collectionsHandler");

const collections = new CollectionsHandler(pathToCollections);

let router = express.Router();

router.route("/*")
  .get((req, res) => {
    res.set("Content-Type", "application/json");
    collections.getCollectionsFromJson(); 
    if(req.url == '/') res.send(collections.getCollections());
    else
    {
      let geovolume = collections.getGeoVolumeFromPath(req.url);
      if(geovolume) res.send(geovolume);
      else res.status(404).send("No geovolume with this id found"); 
    }
  }); 

module.exports = router;