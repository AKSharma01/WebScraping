'use strict';

const request = require('request');
const utils = require(rootDir+"/utils")

const constants = utils.constants;
const psqlDB = utils.postgresDB
const response = utils.response

const Op = psqlDB.Sequelize.Op



const searchUrl = async(req, res, next) => {
	try{
		
		let url = await psqlDB[constants.HYPERLINK].findOne({
			where: {
				id: req.params.id,
				is_delete: false
			}
		})
		

		response.success(res, url, "filter successfully", 200)
	}catch(error){
		response.failure(res, error.message, error.status? error.status: 417)
	}
}



module.exports = searchUrl