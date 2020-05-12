const router = require('express').Router()
const userRouter = require('./userRouter.js')
// const productRouter = require('./product.js')

router.use('/', userRouter)
// router.use('/products', productRouter)

module.exports = router