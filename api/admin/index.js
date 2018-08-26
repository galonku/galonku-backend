const express = require('express')
const router = express.Router()

const controller = require('./controller/index')

router.get('/', controller.show)
router.put('/:id',controller.updateProfile)
router.post('/login',controller.login)
router.delete('/delete-account/:id',controller.deleteAccount)
router.get('/logout',controller.logout)


module.exports = router