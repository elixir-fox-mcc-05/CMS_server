const Router = require('express').Router()
const UserRouter = require('./user.js')
const productsRouter = require('./product.js')
const CategoryRouter = require('./category.js')
const transRouter = require('./transaction.js')

Router.use('/users', UserRouter)
Router.use('/products', productsRouter)
Router.use('/categories', CategoryRouter)
Router.use('/transaction', transRouter)

module.exports = Router;