let router = require('express').Router()
let userRoutes = require('./user.js')
let productRoutes = require('./product.js')
let categoryRoutes = require('./category.js')

let authentication = require('../middelwares/authentication.js')

router.get('/',(req,res)=>{
    res.send('masuk server')
})
router.use('/user',userRoutes)
router.use(authentication)
router.use('/product',productRoutes)
router.use('/category',categoryRoutes)



module.exports = router