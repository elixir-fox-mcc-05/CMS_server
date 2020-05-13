const router = require('express').Router();
const ProductController = require('../controllers/productController.js');
const authentication = require('../middlewares/authentication.js');

router.use(authentication);
router.get('/', ProductController.findAll);
router.post('/', ProductController.createProduct);
router.get('/:id', ProductController.findOne);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;