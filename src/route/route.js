const express = require('express')
const urlController = require('../controller/urlController')

const router = express.Router();


router.post("/url/shorten", urlController.urlShorter)
router.get("/:urlCode", urlController.redirectUrl)





module.exports = router