let router = require('express').Router()
let userRoutes = require('./user.js')
let productRoutes = require('./product.js')
let categoryRoutes = require('./category.js')
let customerRoutes = require('./customer.js')

router.get('/',(req,res)=>{
    res.send('masuk server')
})
router.use('/user',userRoutes)
router.use('/product',productRoutes)
router.use('/category',categoryRoutes)
router.use('/customer',customerRoutes)



module.exports = router