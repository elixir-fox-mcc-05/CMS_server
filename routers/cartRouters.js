const express = require('express')
const router = express.Router()
const cartController = require("../controllers/cartController.js")
const authentication = require("../middlewares/authentication.js")
const customerAuthorization = require("../middlewares/customerAuthorization.js")

// readAll, readOne, addAProductwithUserId, edit productQuantity, deleteProductinCart
//Ini bisa patch, gak perlu put
router.use(authentication)
router.get('/', cartController.findAll)
router.get('/:id', cartController.findOne)
router.post('/', cartController.addProductToCard)

// authorization 
router.patch('/:cartId', customerAuthorization, cartController.editProductQuantity)
router.delete('/:cartId', customerAuthorization, cartController.deleteProductinCart)
router.delete('/', customerAuthorization, cartController.deleteAllProductinCart)

module.exports = router