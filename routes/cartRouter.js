const router = require('express').Router();
const CartController = require('../controllers/cartController');
const authentication = require('../middlewares/authentication');

router.use(authentication);
router.get('/cart', CartController.findAll);
router.post('/cart', CartController.addToCart);
router.delete('/cart/:id', CartController.deleteCart);

module.exports = router;