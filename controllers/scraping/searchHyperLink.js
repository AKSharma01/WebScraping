'use strict';

const request = require('request');
const utils = require(rootDir+"/utils")

const constants = utils.constants;
const psqlDB = utils.postgresDB
const response = utils.response


const searchForURLs = async(req, res, next) => {
	try{
		let linkList
		const urlResponse = request(process.env.BASE_URL, function(err, resp, body) {
			if(err)
				throw(err)
			else{
				// let pattern = new RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})\"/, 'gm')
				// let found = pattern.exec(body)
				linkList = findURLs(body)
				// console.log("resp: ", resp)
				console.log("linkList: ", linkList)
			}
			response.success(res, linkList, "let's see", 200)
		})

	}catch(error){
		response.failure(res, error.message, error.status? error.status: 417)
	}
}

const findURLs = (htmlContent) => {
	let linkList = []
	let match = "http"
	for(let i=0, j=0; i<htmlContent.length; i++){
		if(htmlContent.slice(i, i+4) == match){
			linkList[j] = ""
			while((htmlContent[i]!= "\"") && i < htmlContent.length){
				linkList[j] += htmlContent[i++] 
			}
			j++;
		}
	}
	return linkList
}


module.exports = searchForURLs