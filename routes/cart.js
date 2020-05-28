const router = require('express').Router();
const CartController = require('../controllers/CartController.js');
const authentication = require('../middlewares/authentication');

router.use(authentication);
router.get('/', CartController.findAll);
router.post('/', CartController.addToCart);
router.delete('/', CartController.deleteCart);

module.exports = router;