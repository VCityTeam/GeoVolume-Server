const express = require("express");

const pathToCollections = "./assets/collections.json";

const CollectionsHandler = require("../src/collectionsHandler");

var collections = new CollectionsHandler(pathToCollections);


let router = express.Router();

router.route("/")
  .get((req, res) => {
    res.render("home",{
        "values" : JSON.stringify(collections.getCollections())
      })
  }); 

module.exports = router;