const router = require('express').Router();
const ProductController = require('../controllers/ProductController.js');
const authentication = require('../middlewares/authentication');

router.get('/', ProductController.findAll);
router.get('/:id', ProductController.findOne);
router.use(authentication);
router.post('/', ProductController.createProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;
