const Router = require('express').Router()
const UserRouter = require('./user.js')
const productsRouter = require('./product.js')

Router.use('/users', UserRouter)
Router.use('/products', productsRouter)

module.exports = Router;