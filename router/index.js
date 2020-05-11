const Router = require('express').Router()
const UserRouter = require('./user.js')

console.log('Router index')
Router.use('/users', UserRouter)

module.exports = Router;