const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')
const { authentication } = require('../middlewares/authentication')

router.get('/', ProductController.findAllProduct)
router.post('/', authentication, ProductController.createProduct)
router.get('/:id', ProductController.findProductById)
router.put('/:id', authentication, ProductController.updateProduct)
router.patch('/:id', ProductController.updateProductStock)
router.delete('/:id', authentication, ProductController.deleteProduct)

module.exports = router