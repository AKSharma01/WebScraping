'use strict';

const request = require('request');
const utils = require(rootDir+"/utils")

const constants = utils.constants;
const psqlDB = utils.postgresDB
const response = utils.response

const Op = psqlDB.Sequelize.Op



const searchUrls = async(req, res, next) => {
	try{
		let query = {}
		if(req.query.search){
			if(!Number.isNaN(parseInt(req.query.search))){
				query["count"] = parseInt(req.query.search)
			}else{
				query = {
					[Op.or]: {
						url: {
							[Op.regexp]: req.query.search
						}
					}
				}
			}
		}

		query.is_delete = false
		let page = req.query.page? parseInt(req.query.page): 0
		let limit = req.query.limit? req.query.limit: 20

		let urls = await psqlDB[constants.HYPERLINK].findAll({
			where: query,
			limit: limit,
			offset: limit*page
		})
		let count = await psqlDB[constants.HYPERLINK].count({
			where: query
		})


		let pagination = {
			currentPage: page,
			nextPage: page +1 < Math.ceil(count/limit)? page +1: -1,
			totalPage: Math.ceil(count/limit),
			limit: limit
		}
		response.success(res, {
			urls,
			pagination
		}, "filter successfully", 200)
	}catch(error){
		response.failure(res, error.message, error.status? error.status: 417)
	}
}



module.exports = searchUrls