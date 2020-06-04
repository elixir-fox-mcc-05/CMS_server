const express = require('express')
const router = express.Router()
const CustomerController = require('../controllers/customerController')
const { customerAuthentication } = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/', customerAuthentication, CustomerController.getCustomerDetail)
router.put('/', customerAuthentication, CustomerController.updateCustomerDetail)
router.post('/register', CustomerController.registerCustomer)
router.post('/login', CustomerController.loginCustomer)
router.get('/cart', customerAuthentication, CustomerController.findAllCustomerCart)
router.post('/cart', customerAuthentication, CustomerController.createCart)
router.get('/:CartId', customerAuthentication, authorization, CustomerController.findCartById)
router.post('/:CartId', customerAuthentication, authorization, CustomerController.addProductToCart)
router.put('/:CartId', customerAuthentication, authorization, CustomerController.updateCartProduct)
router.patch('/:CartId', customerAuthentication, authorization, CustomerController.updateCartStatus)
router.delete('/:CartId/:CartProductId', customerAuthentication, authorization, CustomerController.deleteProductFromCart)

module.exports = router