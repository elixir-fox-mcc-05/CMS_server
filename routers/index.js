const express = require('express')
const router = express.Router()
const userRoutes = require("../routers/userRoutes.js")
// const productRoutes = require("../routers/ProductRouters")

router.use('/', userRoutes)
// router.use('/products', productRoutes)

module.exports = router