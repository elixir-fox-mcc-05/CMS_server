'use strict'

const router = require(`express`).Router() 
const ProductController = require(`../controllers/productcontroller`)
const { authenticate, authorize } = require(`../middlewares/userauth`)

router.get(`/`, ProductController.getAll)

router.post(`/add`, authenticate, ProductController.addProduct)
router.put(`/edit`, authenticate, authorize, ProductController.editProduct)
router.delete(`/delete`, authenticate, authorize, ProductController.removeProduct)

module.exports = router