const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication');
const ProductController = require('../controllers/productController');

router.use(authentication);
router.post('/', ProductController.createProduct);
router.get('/', ProductController.readAllProduct);
router.put('/:productId', ProductController.updateProduct);
router.delete('/:productId', ProductController.deleteProduct);
router.get('/:productId', ProductController.searchProduct);

module.exports = router;





