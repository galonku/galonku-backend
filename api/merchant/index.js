const express = require('express');
const router = express.Router();

const controller = require('./controller/index')
const authToken = require('../auth/index')

/* GET home page. */
router.get('/verifytoken', authToken.verifyToken, authToken.valid)

router.get('/', controller.show)
router.get('/search', controller.searchMerchants)
router.get('/login', controller.login)
router.get('/logout', controller.logout)
router.post('/register/', controller.register)
router.delete('/delete-account/:id', authToken.verifyToken, controller.deleteAccount)

module.exports = router;
