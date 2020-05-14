const router = require('express').Router()
const ProductController = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.get('/', ProductController.readProduct)
router.post('/', ProductController.addProduct)
// router.get('/:id', ProductController.findById)
router.put('/:id', authorization,  ProductController.updateProduct)
router.delete('/:id', authorization, ProductController.deleteProduct)

module.exports = router