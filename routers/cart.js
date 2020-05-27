const router = require('express').Router();
const CartController = require('../controllers/cart.js');

router.post('/', CartController.addProduct);
router.patch('/:id', CartController.changeQuantity);
router.delete('/:id', CartController.deleteProduct);

module.exports = router;
