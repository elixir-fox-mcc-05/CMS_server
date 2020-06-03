const express = require('express');
const router = express.Router();

const CartController = require('../controllers/cart');
const authentication = require('../middlewares/authentication');
const { authorization } = require('../middlewares/authorization');

router.post('/', authentication, CartController.addCart);
router.get('/items', authentication, CartController.findNotYetPaid);
router.get('/items/paid', authentication, CartController.findPaid);
router.put('/checkout', authentication, CartController.checkout);

module.exports = router;
