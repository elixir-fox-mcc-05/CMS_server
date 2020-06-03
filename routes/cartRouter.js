const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication');
const CartController = require('../controllers/cartController');

router.use(authentication);
router.post('/', CartController.createCart);
router.get('/', CartController.readCart);
router.put('/:cartId', CartController.updateCart);
router.delete('/:cartId', CartController.deleteCart);
router.get('/history', CartController.readCartHistory);

module.exports = router;