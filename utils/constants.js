'use strict';

const MODEL_NAMES = {
	HYPERLINK: 'hyper_link'
}


const RESPONSE = {
	SUCCESS: {
		STATUS: 200,
		MESSAGE: 'success'
	},


	FAILURE: {
		STATUS: 500,
		MESSAGE: "Oops! Something went wrong"
	}
}



module.exports ={
	...MODEL_NAMES,
	...RESPONSE
}