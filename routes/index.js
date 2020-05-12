const router = require('express').Router()
const administrator = require('./administrator')
const product = require('./product')
// const user = require('./user')

router.use('/', administrator)
router.use('/product', product)
// router.use('/users', user)

module.exports = router