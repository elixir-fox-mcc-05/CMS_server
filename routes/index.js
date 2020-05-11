const express = require('express');
const router = express.Router();

const productTRouter = require('./product');
const userRouter = require('./user.js');

const {User, Task} = require('../models')

router.get('/', (req, res) => {
    res.status(200).json({
        msg: 'masuk'
    })
});
router.use('/user', userRouter);
router.use('/product', productTRouter);

module.exports = router;
