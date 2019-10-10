'use strict';

global.rootDir = __dirname
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser")
const rateLimit = require("express-rate-limit");

const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {

	console.log(`Master ${process.pid} is running`);

	// Fork workers.
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on("exit", (worker, code, signal) => {
		console.log(`worker ${worker.process.pid} died`);
	});

} else {

	const apis = require("./routes");	

	const app = express()


	app.use(bodyParser.json());

	app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));

	app.use(function (req, res, next) {
	    res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
	    next();
	});

	const limiter = rateLimit({
	  windowMs: 5 * 60 * 1000,
	  max: 50
	});


	app.use("/apis", limiter, apis)


	app.listen(5000, () => {
	    console.log("server is running!!!!");
	});
}
