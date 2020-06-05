const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication');
const ProductController = require('../controllers/productController');

router.post('/byName', ProductController.readProductsByName)
router.get('/:productId', ProductController.searchProduct);
router.use(authentication);
router.post('/', ProductController.createProduct);
router.get('/', ProductController.readAllProduct);
router.put('/:productId', ProductController.updateProduct);
router.delete('/:productId', ProductController.deleteProduct);

module.exports = router;





