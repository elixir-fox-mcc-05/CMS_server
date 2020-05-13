"use strict";

const router = require('express').Router();
const UserRouter = require('./user');
const ProductRouter = require('./product');
const CategoryRouter = require('./category');

router.use("/user", UserRouter);
router.use("/product", ProductRouter);
router.use("/category", CategoryRouter);

module.exports = router;