const router = require('express').Router();
const userRoute = require('./user.js');
const productRoute = require('./product.js');
const categoryRoute = require('./category.js');

router.use('/users', userRoute);
router.use('/products', productRoute);
router.use('/categories', categoryRoute);

module.exports = router;
