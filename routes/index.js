const express = require('express');
const router = express.Router();
const userRoute = require('./userRoute.js');
const productRoute = require('./productRoute.js');

router.use('/products', productRoute);
router.use('/users', userRoute);
module.exports = router;