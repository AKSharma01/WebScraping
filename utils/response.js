'use strict';


const constants = require("./constants")

const success = (response, data=null, message, statusCode) => {
	response.statusCode = statusCode? statusCode: constants.SUCCESS.STATUS
	response.json({
		data: data,
		message: message? message: constants.SUCCESS.MESSAGE,
		status: statusCode? statusCode: constants.SUCCESS.STATUS
	})
}


const failure = (response, message, statusCode, hint=null) => {
	response.statusCode = statusCode? statusCode: constants.FAILURE.STATUS
	response.json({
		hint: process.env.DEBUG && hint? hint: null,
		message: message? message: constants.FAILURE.MESSAGE,
		status: statusCode? statusCode: constants.FAILURE.STATUS
	})
}


module.exports = {
	success,
	failure
}