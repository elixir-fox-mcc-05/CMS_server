const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController.js');
const authentication = require('../middlewares/authentication.js');

router.post('/', authentication, ProductController.create);

module.exports = router;