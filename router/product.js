const router = require('express').Router()
const ProductController = require('../controller/product.js')
const { authentication } = require('../middleware/authentication.js')
const  authorization  = require('../middleware/authorization.js')

router.get('/', ProductController.findAll)
router.get('/:id', ProductController.findById)

router.use(authentication)
router.post('/', authorization,ProductController.createProduct)
router.put('/:id', authorization,ProductController.updateProduct)
router.delete('/:id', authorization,ProductController.deleteProduct)


module.exports = router