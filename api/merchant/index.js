const express = require('express');
const router = express.Router();

const controller = require('./controller/index')

/* GET home page. */
router.get('/', controller.show)
router.get('/search', controller.searchMerchants)
router.get('/login',controller.login)
router.post('/register/', controller.register)
router.delete('/delete-account/:id', controller.deleteAccount)

module.exports = router;
