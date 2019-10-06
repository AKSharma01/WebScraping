'use strict'


const app = require("express")();
const scraping_v1 = require("./scraping")

app.use("/v1/scraping", scraping_v1);

module.exports = app;