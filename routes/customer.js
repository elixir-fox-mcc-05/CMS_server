const express = require('express')
const router = express.Router()
const CustomerController = require('../controllers/customerController')
const { authentication } = require('../middlewares/authentication')

// router.use(authentication)
router.post('/register', CustomerController.registerCustomer)
router.post('/login', CustomerController.loginCustomer)
router.get('/:customerId', CustomerController.getCustomerDetail)
router.put('/:customerId', CustomerController.updateCustomerDetail)
router.get('/:customerId/cart', CustomerController.findAllCustomerCart)
router.post('/:customerId/cart', CustomerController.createCart)
router.get('/:cartId', CustomerController.findCartById)
router.post('/:cartId', CustomerController.addProductToCart)
router.put('/:cartId', CustomerController.updateCartProduct)
router.delete('/:cartId', CustomerController.deleteCart)

module.exports = router