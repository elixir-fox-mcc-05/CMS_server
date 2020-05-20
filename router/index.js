const router = require('express').Router()
const UserController = require('../controllers/userController')
// const CostumerController = require('../controllers/costumerController')
const products = require('./products')
const categories = require('./categories')
const carts = require('./carts')
const banners = require('./banners')

router.post('/login',UserController.login)
// router.post('/costumer/login',CostumerController.login)
// router.post('/costumer/register',CostumerController.register)
router.post('/register', UserController.register)
router.post('/google-login', UserController.googleLogin)
router.use('/products', products)
router.use('/category', categories)
router.use('/cart',carts)
router.use('/banner',banners)




module.exports = router