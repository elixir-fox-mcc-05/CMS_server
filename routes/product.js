const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/product');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.use(authentication);
// create
router.post('/', authorization, ProductController.addProduct);

// fetch & find one
router.get('/', ProductController.findAllProducts);
router.get('/:id', ProductController.getAProduct);

// update & delete
router.put('/:id', authorization, ProductController.updateProduct);
router.delete('/:id', authorization, ProductController.deleteProduct);

module.exports = router;
