const router = require('express').Router()
const ProductController = require('../controllers/productController')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.get('/', ProductController.readProduct)
router.post('/', ProductController.addProduct)
// router.put()
// router.delete()

module.exports = router