const Router = require('express').Router()
const UserRouter = require('./user.js')

Router.use('/users', UserRouter)

module.exports = Router;