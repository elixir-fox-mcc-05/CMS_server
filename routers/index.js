const router = require('express').Router();
const userRoute = require('./user.js');
const productRoute = require('./product.js');
const categoryRoute = require('./category.js');
const cartRoute = require('./cart.js');
const customerRoute = require('./customer.js');

router.use('/customers', customerRoute);
router.use('/users', userRoute);
router.use('/products', productRoute);
router.use('/categories', categoryRoute);
router.use('/cart', cartRoute);

module.exports = router;
