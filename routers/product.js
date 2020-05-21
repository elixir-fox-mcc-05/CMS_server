const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const authentication = require('../middlewares/authientication')
const authorization = require('../middlewares/authorization')

router.get('/', ProductController.readProduct)
router.use(authentication)
router.post('/', authorization, ProductController.addProduct)
router.delete('/:id', authorization, ProductController.deleteProduct)
router.patch('/:id', ProductController.updateProduct)

module.exports = router