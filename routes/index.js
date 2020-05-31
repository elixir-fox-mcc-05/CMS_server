const express = require('express');
const router = express.Router();
const userRoute = require('./userRoute.js');
const productRoute = require('./productRoute.js');
const shoppingChartRoute = require('./shoppingChartRoute.js');

router.use('/products', productRoute);
router.use('/users', userRoute);
router.use('/shoppingchart', shoppingChartRoute);
module.exports = router;