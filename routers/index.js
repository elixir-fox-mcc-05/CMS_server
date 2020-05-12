const router = require('express').Router()
const userRouter = require('./userRouter.js')
const productRouter = require('./productRouter.js')

router.use('/', userRouter)
router.use('/products', productRouter)

module.exports = router
