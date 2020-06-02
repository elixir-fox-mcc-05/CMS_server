const router = require('express').Router();
const CartController = require('../controllers/cart.js');
const { authenticateCustomer } = require('../middlewares/authentication.js');
const { authorizeCustomer } = require('../middlewares/authorization.js');

router.use(authenticateCustomer);
router.get('/', CartController.showCart);
router.post('/', CartController.addProduct);
router.get('/history', CartController.getTransactionHistory);
router.patch('/checkout', CartController.checkOut);
router.patch('/:id', authorizeCustomer, CartController.changeQuantity);
router.delete('/:id', authorizeCustomer, CartController.removeProduct);

module.exports = router;
