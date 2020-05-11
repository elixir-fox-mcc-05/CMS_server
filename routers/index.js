const router = require('express').Router();
const userRoute = require('./user.js');
const productRoute = require('./product.js');

router.use('/users', userRoute);
router.use('/register', productRoute);

module.exports = router;
