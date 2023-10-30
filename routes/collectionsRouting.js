const express = require("express");
const pug = require("pug");

const pathToCollections = "./assets/collections_scale.json";

const CollectionsHandler = require("../src/collectionsHandler");

var collections = new CollectionsHandler(pathToCollections);

let router = express.Router();

router.route("/*").get((req, res) => {
  res.set("Content-Type", "application/json");
  res.set("Access-Control-Allow-Origin", "*")
  collections.getCollectionsFromJson();
  let geovolumesRequested = collections.getGeoVolumesFromPath(req.params[0]);
  if (!geovolumesRequested) {
    res.status(404).send("No geovolume with this id found");
    return 0;
  }

  if (req.query.bbox)
    geovolumesRequested = collections.getGeoVolumeFromBboxAsQuery(
      geovolumesRequested,
      req.query
    );
  if (!geovolumesRequested) {
    res.status(200).send("No geovolume with this bbox found");
    return 0;
  }
    res.status(200).send(geovolumesRequested);
});

module.exports = router;
