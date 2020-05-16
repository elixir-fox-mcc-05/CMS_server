const router = require('express').Router();
const ProductController = require('../controllers/productController')

router.post('/products', ProductController.createProduct)
// router.get('/products', ProductController.showProduct)


module.exports = router;
