const express = require('express')
const router = express.Router()
const productController = require("../controllers/productController.js")
const authentication = require("../middlewares/authentication.js")
const authorization = require ("../middlewares/authorization.js")

router.use(authentication)
router.get("/", productController.findAll)
router.get("/:id", productController.findOne)

router.post("/",authorization, productController.addProduct)
router.put("/:id", authorization, productController.updateProductInfo)
router.delete("/:id", authorization, productController.deleteProducts)

module.exports = router