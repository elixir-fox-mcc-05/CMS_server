let userRoutes = require('express').Router()
let UserCon = require('../controllers/user')

userRoutes.post('/login',UserCon.login)

module.exports = userRoutes