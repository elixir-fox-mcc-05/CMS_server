const express = require("express");
const router = express.Router();

const userRoutes = require("./user.js");
router.use("/users", userRoutes);

const productRoutes = require("./product.js");
router.use("/products", productRoutes);

module.exports = router;