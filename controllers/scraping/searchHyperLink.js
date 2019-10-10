'use strict';

const request = require('request');
const utils = require(rootDir+"/utils")

const constants = utils.constants;
const psqlDB = utils.postgresDB
const response = utils.response


const searchForURLs = async(req, res, next) => {
	try{
		/**
		 *	make a API request and scrap all the url from html 
		 */
		let linkList, domainParams
		const urlResponse = request(process.env.BASE_URL, async function(err, resp, body) {
			if(err)
				throw(err)
			else{
				// let pattern = new RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})\"/, 'gm')
				// let found = pattern.exec(body)

				/** findURLs function will returm the list of url found in html template
				*/
				linkList = findURLs(body)
				domainParams = await saveDomain(linkList)
				// console.log("resp: ", resp)
				// console.log("linkList: ", linkList)
			}
			response.success(res, domainParams, "all urls are successfully saved in DB", 201)
		})

	}catch(error){
		response.failure(res, error.message, error.status? error.status: 417)
	}
}

const findURLs = (htmlContent) => {
	/**	This for loop try to find the string which start with http and end with 
	 * double inverted commas
	 */
	try{
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
	}catch(error){
		throw(error)
	}
}

const saveDomain = async(urlList) => {
	/**	
	 *	this function is use to filter again the url to remove the unwanted test or tag
	 * and saved in JSON obejct with their repitation count and url params (if exists)
	 */
	try{
		let urlAndParmas = {}
		urlList.forEach((url)=>{
			// console.log("original url : ", url)
			url = url.split("\'")[0]
			// console.log("url filter by ('): ", url)
			url = url.split("?")
			// console.log("2 url: ", url)

			
			if(!(url[0] in urlAndParmas))
				urlAndParmas[url[0]] = {
					count: 0,
					params: []
				}
			else
				urlAndParmas[url[0]].count++

			if(url[1])
				url[1].split("&").forEach((keyValue) => {
					let key = keyValue.split("=")[0]
					if(!urlAndParmas[url[0]].params.includes(key))
						urlAndParmas[url[0]].params.push(key)
				})
		})
		return await updateOrCreateIntoDB(urlAndParmas)
		// console.log("urlAndParmas: ", urlAndParmas)
		// return //urlAndParmas
	}catch(error){
		throw(error)
	}
}


const updateOrCreateIntoDB = async(urlAndParmas) => {
	/**	This function will update the url repitation count params if url already exists in 
	 * database else it will create a new entity and return list of the object which are 
	 * inserted or updated
	 */
	try{
		let saved = []
		await Promise.all(Object.keys(urlAndParmas).map(async(url) => {
			let obj = {}
			let existingUrl = await psqlDB[constants.HYPERLINK].findOne({
				where:{
					url: url,
					is_delete: false
				}
			})
			if(existingUrl){
				// if(urlAndParmas[url].length != existingUrl.params.length){
					// let paramlist = []
				// }
				urlAndParmas[url].params.forEach((param) => {
					if(!(existingUrl.params.includes(param))){
						existingUrl.params.push(param)
					}
				})
				existingUrl.params = existingUrl.params
				existingUrl.count = urlAndParmas[url].count
				obj = await existingUrl.save()
			}else{
				obj = await psqlDB[constants.HYPERLINK].create({
					url: url,
					params: urlAndParmas[url].params,
					count: urlAndParmas[url].count,
					is_delete: false
				})
				console.log("created successfully")
			}
			saved.push(obj)
		}))
		// console.log("saved: ", saved)
		// for(let url in urlAndParmas){
			
		// }
		return saved
	}catch(error){
		throw(error)
	}
}


module.exports = searchForURLs