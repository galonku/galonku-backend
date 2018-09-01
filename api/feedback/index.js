const express = require('express')
const router = express.Router()

const authToken = require('../auth/auth-token')

router.get('/feedback',authToken.verifyTokenAsMerchants,controller.show)
