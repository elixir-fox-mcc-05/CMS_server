const router = require('express').Router()
const UserController = require('../controllers/userController')
const CostumerController = require('../controllers/costumerController')
const products = require('./products')

router.post('/login',UserController.login)
// router.post('/costumer/login',CostumerController.login)
// router.post('/costumer/register',CostumerController.register)
router.post('/register', UserController.register)
router.use('/products', products)




module.exports = router