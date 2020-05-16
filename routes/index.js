const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');

router.get('/', (req, res) => {
    res.status(200).json({
        message: `E-Commerce CMS working`
    })
})
router.use('/users', userRouter);
router.use('/products', productRouter);

module.exports = router;