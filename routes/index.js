const router = require('express').Router()
const userRoute = require('./user')
const productRoute = require('./product')

router.use('/users', userRoute)
router.use('/products', productRoute)

module.exports = router