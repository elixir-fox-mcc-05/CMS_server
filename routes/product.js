const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')
const { authentication } = require('../middlewares/authentication')

router.use(authentication)
router.get('/', ProductController.findAllProduct)
router.post('/', ProductController.createProduct)
router.get('/:id', ProductController.findProductById)
router.put('/:id', ProductController.updateProduct)
router.delete('/:id', ProductController.deleteProduct)

module.exports = router