const router = require('express').Router()
const Controller = require('../controller/user')


router.post('/register', Controller.register)
router.post('/login', Controller.logIn)

module.exports = router