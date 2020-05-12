const router = require('express').Router()
const ProductController = require('../controllers/product')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/', ProductController.findAll)
router.get('/:id', ProductController.findOne)

router.use(authentication)

router.post('/', authorization,  ProductController.create)
router.put('/:id', authorization, ProductController.update)
router.delete('/:id', authorization, ProductController.delete)


module.exports = router