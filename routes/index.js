const router = require('express').Router();
const userRouter = require('./user.js');
const productRouter = require('./product.js');
const categoryRouter = require('./category.js');
const cartRouter = require('./cart.js');
const orderRouter = require('./order.js');
const paymentRouter = require('./paymentchannel.js');

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'CMS Server is running'
  })
});
router.use('/', userRouter);
router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/carts', cartRouter);
router.use('/orders', orderRouter);
router.use('/payments', paymentRouter);

module.exports = router;
