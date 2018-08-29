const express = require('express')
const router = express.Router()

const controller = require('./controller/index')
const authToken = require('../auth/auth-token')

router.get('/verifytoken', authToken.verifyToken),

router.get('/', authToken.verifyToken, controller.show)
router.post('/login',controller.login)
router.get('/logout',controller.logout)

module.exports = router
