const router = require('express').Router()
const user = require('./user')
const product = require('./product')
const cart = require('./cart')

router.use('/users', user)
router.use('/products', product)
router.use('/carts', cart)

module.exports = router