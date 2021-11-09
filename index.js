const express = require("express");
const home = require("./routes/home");
const collections = require("./routes/collectionsRouting");

const cors = require("./src/cors");
const {queryParamsToLower} = require("./src/querySanitizers");

const proj4 = require('proj4');

proj4.defs(
  'EPSG:3946',
  '+proj=lcc +lat_1=45.25 +lat_2=46.75' +
    ' +lat_0=46 +lon_0=3 +x_0=1700000 +y_0=5200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
);

const app = express()

app.use(cors);
app.use(queryParamsToLower);

app.use("/",home);
app.use("/collections",collections);
app.use('/src', 
    express.static('./src'),
    express.static('./node_modules/jquery/dist')
    );
app.set("view engine","pug");


module.exports = app.listen(3000, err => {
    if (err) {
      return console.log(err);
    }
    else {
        console.log('Votre app est disponible sur localhost:3000 !');
    }
  });