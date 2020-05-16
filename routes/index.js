const express = require('express');
const router = express.Router();

const productRouter = require('./product');
const userRouter = require('./user.js');

const {User, Task} = require('../models')

router.get('/', (req, res) => {
    res.status(200).json({
        msg: 'server connected'
    })
});
router.use('/user', userRouter);
router.use('/product', productRouter);

module.exports = router;
