const express = require("express");
const router = express.Router();

const controller = require('./controller/index')

router.get('/',controller.show)
router.post('/send',controller.send)

module.exports=router