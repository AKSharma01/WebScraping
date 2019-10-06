'use strict';

const Sequelize = require('sequelize');
const constants = require("./constants");
const models = require(rootDir + "/models");


const db = {};

let env = process.env.ENV;
let environ;
switch (env) {
	case 'local':
		process.env.DEBUG = true;
		environ = "LOCAL_";
		break;
	case "dev":
		process.env.DEBUG = true;
		environ = "DEV_";
		break;
	case "prod":
		environ = "PROD_";
		break;
}

// terminate the server if env is not set properly
if (!environ) {
	console.log("env not set");
	process.exit();
}

const Op = Sequelize.Op;


let setting = {
	host: process.env[environ + "PSQL_HOST"],
	port: process.env[environ + "PSQL_PORT"],
	username: process.env[environ + "PSQL_USER"],
	database: process.env[environ + "PSQL_DATABASE"],
	password: process.env[environ + "PSQL_PASSWORD"],
	dialect: process.env[environ + "DB_TYPE"],
	pool: {
		max: 5,
		min: 0,
		idle: 100000,
		acquire: 50000,
		evict: 50000,
		handleDisconnects: true
	},
	logging: process.env.DEBUG? true: false
};

// check ip based pem file
// ipBasedPemFile(setting);
if(env != "prod")
	console.log("setting: ", setting);

const sequelize = new Sequelize(setting);

sequelize
	.authenticate()
	.then(() => {
		console.log('connected to database successfully')
	})
	.catch((error) => {
		console.log(`error message: (psql db connection error) ${error.message}`);
		process.exit();
	});


sequelize.sync({
	force: false
});


db[constants.HYPERLINK] = require(rootDir+"/models/hyperLink")(sequelize, Sequelize);

db.Sequelize = Sequelize;
db.sequelize = sequelize;


module.exports = db;