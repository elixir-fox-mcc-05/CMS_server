const router = require('express').Router()
const userRouter = require('./user')
const productRouter = require('./product')

router.use('/', userRouter)
router.use('/product', productRouter)

module.exports = router