const router = require('express').Router();
const ControllerTransaction = require("../controller/controllertransaction");
const Authentication = require('../middlewares/authentication');
const authorizationUser = require('../middlewares/authorizationUser')

router.use(Authentication);
router.get('/', ControllerTransaction.findAll);
router.post('/', ControllerTransaction.CreateTransaction);
router.put('/checkout', authorizationUser, ControllerTransaction.checkOut)
router.get('/history', ControllerTransaction.checkOutHistory)
router.delete('/:id', ControllerTransaction.deleteWishlist)

module.exports = router;