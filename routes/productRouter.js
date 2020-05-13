const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication');
const ProductController = require('../controllers/productController');

router.use(authentication);
router.post('/', ProductController.createProduct);
router.get('/', ProductController.readAllProduct);
router.put('/:productId', ProductController.updateProduct);
router.delete('/:productId', ProductController.deleteProduct);

module.exports = router;





////NOTE: not using it now, maybe i'll use this later
// router.get('/:productId', ProductController.searchProduct);