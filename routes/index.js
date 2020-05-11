const router = require('express').Router();
const userRouter = require('./user.js');
const productRouter = require('./product.js');

router.use('/', userRouter);
router.use('/products', productRouter);

module.exports = router;
