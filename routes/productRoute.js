const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController.js');
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');
const multer = require('multer');
const upload = multer({});

router.get('/customer', ProductController.read);
router.post('/upload', upload.single('image'), ProductController.uploadFile);
router.delete('/:productid', authentication, authorization, ProductController.delete);
router.patch('/:productid', authentication, authorization, ProductController.update);
router.get('/', authentication, ProductController.read);
router.post('/', authentication, authorization, ProductController.create);

module.exports = router;