const router = require('express').Router()
const UserController = require('../controller/user.js')

console.log('router user')
router.post('/register', UserController.register)
router.post('/', UserController.logIn)


module.exports = router;