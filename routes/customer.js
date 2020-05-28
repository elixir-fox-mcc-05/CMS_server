const express = require('express')
const router = express.Router()
const CustomerController = require('../controllers/customerController')
const { authentication } = require('../middlewares/authentication')

// router.use(authentication)
router.post('/register', CustomerController.registerCustomer)
router.post('/login', CustomerController.loginCustomer)
router.get('/:customerId', CustomerController.getCustomerDetail)//ok
router.put('/:customerId', CustomerController.updateCustomerDetail)
router.get('/:customerId/cart', CustomerController.findAllCustomerCart)//ok
router.post('/:customerId/cart', CustomerController.createCart)
router.get('/:customerId/:cartId', CustomerController.findCartById)
router.post('/:customerId/:cartId', CustomerController.addProductToCart)
router.put('/:customerId/:cartId', CustomerController.updateCartProduct)
router.patch('/:customerId/:cartId', CustomerController.updateCartStatus)
router.delete('/:customerId/:cartId', CustomerController.deleteCart)

module.exports = router