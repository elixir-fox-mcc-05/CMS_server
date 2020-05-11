const router = require('express').Router();
const userRouter = require('./user.js');

router.use('/', userRouter);

module.exports = router;
