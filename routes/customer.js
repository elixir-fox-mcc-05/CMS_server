const express = require('express')
const router = express.Router()
const CustomerController = require('../controllers/customerController')
const { customerAuthentication } = require('../middlewares/authentication')

router.get('/', customerAuthentication, CustomerController.getCustomerDetail)//ok
router.put('/', customerAuthentication, CustomerController.updateCustomerDetail)
router.post('/register', CustomerController.registerCustomer)
router.post('/login', CustomerController.loginCustomer)
router.get('/cart', customerAuthentication, CustomerController.findAllCustomerCart)//ok
router.post('/cart', customerAuthentication, CustomerController.createCart)
router.get('/:CartId', customerAuthentication, CustomerController.findCartById)
router.post('/:CartId', customerAuthentication, CustomerController.addProductToCart)
router.put('/:CartId', customerAuthentication, CustomerController.updateCartProduct)
router.patch('/:CartId', customerAuthentication, CustomerController.updateCartStatus)
router.delete('/:CartId/:CartProductId', customerAuthentication, CustomerController.deleteProductFromCart)

module.exports = router