'use strict';

global.rootDir = __dirname
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser")


const apis = require("./routes");

const app = express()


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    next();
});

app.use("/apis", apis)


app.listen(5000, () => {
    console.log("server is running!!!!");
});
