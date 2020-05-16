const router = require('express').Router();
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');

router.use('/', userRouter);
router.use('/', productRouter)

module.exports = router;
