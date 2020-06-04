"use strict";

const router = require('express').Router();
const UserRouter = require('./user');
const ProductRouter = require('./product');
const CategoryRouter = require('./category');
const TransactionRouter = require('./transaction');

router.use("/user", UserRouter);
router.use("/product", ProductRouter);
router.use("/category", CategoryRouter);
router.use("/transaction", TransactionRouter);

module.exports = router;