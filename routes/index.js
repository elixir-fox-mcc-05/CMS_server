const express = require('express');
const router = express.Router();

const UserRouter = require('./user');
const ProductRouter = require('./product');
const CartCouter = require('./cart');

router.use('/', UserRouter);
router.use('/products', ProductRouter);
router.use('/cart', CartCouter);

module.exports = router;
