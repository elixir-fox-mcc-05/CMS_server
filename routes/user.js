const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { authentication } = require('../middlewares/authentication')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/order', authentication, userController.getAllOrder)
router.patch('/order', authentication, userController.updateOrder)

module.exports = router