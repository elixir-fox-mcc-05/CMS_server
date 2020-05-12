const router = require('express').Router()
const ProductController = require('../controllers/productController')
const admin_authentication = require('../middlewares/admin_auth')

router.use(admin_authentication)
router.get('/', ProductController.findAll) // show all products
router.post('/', ProductController.create) // create new products
router.get('/:productId', ProductController.findOne) // show by id products
router.put('/:productId', ProductController.update) // edit by id products
router.delete('/:productId', ProductController.delete) // delete by id products

module.exports = router