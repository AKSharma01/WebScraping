'use strict'



const router = require("express").Router()
const controller = require(`${rootDir}/controllers/scraping`)

router.post("/", controller.searchHyperLink)


module.exports = router