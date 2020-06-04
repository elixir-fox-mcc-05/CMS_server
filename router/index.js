const router = require('express').Router()
const userRouter = require('./user.js');
const productRouter = require('./product.js');
const categoryRouter = require('./category.js');
const cartController = require('./cart.js');

router.use('/user', userRouter);
router.use('/product', productRouter );
router.use('/category', categoryRouter);
router.use('/cart', cartController);

module.exports = router;