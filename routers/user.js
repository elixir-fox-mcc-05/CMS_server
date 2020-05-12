let router = require('express').Router()
let userController = require('../controllers/user')

router.post('/register', userController.register)
router.post('/login', userController.login)

module.exports = router