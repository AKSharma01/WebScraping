'use strict'



const router = require("express").Router()
const controller = require(`${rootDir}/controllers/scraping`)

router.post("/", controller.searchHyperLink)
router.get("/", controller.searchUrls)
router.get("/:id", controller.searchUrl)


module.exports = router