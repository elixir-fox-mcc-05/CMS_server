const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/product');
const authentication = require('../middlewares/authentication');
const { authorization } = require('../middlewares/authorization');

// create
router.post('/', authentication, authorization, ProductController.addProduct);

// fetch & find one
router.get('/', ProductController.findAllProducts);
router.get('/:id', ProductController.getAProduct);

// update & delete
router.put('/:id', authentication, authorization, ProductController.updateProduct);
router.delete('/:id', authentication, authorization, ProductController.deleteProduct);

module.exports = router;
