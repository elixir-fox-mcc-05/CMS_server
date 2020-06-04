const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController.js')
const authentication = require('../middlewares/authentication.js')

router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.get('/transactions', authentication, UserController.showTransactionHistory)
module.exports = router;