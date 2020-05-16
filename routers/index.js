const express = require('express')
const router = express.Router()
const userRoutes = require("../routers/userRoutes.js")
const productRoutes = require("../routers/ProductRouters.js")

router.get('/', function(req, res) {
    res.status(200).json({
        message: 'Hop & Lop CMS Domain Connected'
    })
})

router.use('/', userRoutes)
router.use('/products', productRoutes)

module.exports = router