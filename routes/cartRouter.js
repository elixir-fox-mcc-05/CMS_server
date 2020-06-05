const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication');
const cartAuth = require('../middlewares/cartAuth');
const CartController = require('../controllers/cartController');

router.use(authentication);
router.post('/', CartController.createCart);
router.get('/', CartController.readCart);
router.put('/:cartId', cartAuth, CartController.paymentCart);
router.delete('/:cartId', cartAuth, CartController.deleteCart);
router.get('/history', CartController.readCartHistory);

module.exports = router;