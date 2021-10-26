const express = require("express");
const home = require("./routes/home");
const collections = require("./routes/collections");

const cors = require("./src/cors");
const {queryParamsToLower} = require("./src/querySanitizers");

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