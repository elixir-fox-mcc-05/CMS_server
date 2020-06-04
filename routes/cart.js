const express = require('express');
const router = express.Router();

const CartController = require('../controllers/cart');
const authentication = require('../middlewares/authentication');
const { authorizationCustomerCart } = require('../middlewares/authorization');

router.post('/', authentication, CartController.addCart);
router.get('/items', authentication, CartController.findNotYetPaid);
router.delete('/items/:id', authentication, authorizationCustomerCart, CartController.deleteAnItem);
router.get('/items/paid', authentication, CartController.findPaid);
router.put('/items/edit/:id', authentication, authorizationCustomerCart, CartController.updateQuantity);
router.put('/checkout', authentication, CartController.checkout);

module.exports = router;
