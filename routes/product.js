const router = require('express').Router()
const ProductController = require('../controllers/productController')
const is_admin = require('../middlewares/is_admin')

router.get('/', ProductController.findAll) // show all products

// could access by admin
router.use(is_admin)
router.post('/', ProductController.create) // create new products
router.get('/:productId', ProductController.findOne) // show by id products
router.put('/:productId', ProductController.update) // edit by id products
router.delete('/:productId', ProductController.delete) // delete by id products

module.exports = router