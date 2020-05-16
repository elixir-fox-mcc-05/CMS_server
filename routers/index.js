let router = require('express').Router()
let UserRouter = require('./user')
let ProductRouter = require('./product')

router.use('/', UserRouter)
router.use('/product', ProductRouter)


module.exports = router