const router = require('express').Router();
const ProductController = require('../controllers/ProductController.js');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization.js');

router.get('/', ProductController.findAll);
router.get('/:id', ProductController.findOne);
router.use(authentication);
router.post('/', ProductController.createProduct);
router.put('/:id', authorization, ProductController.updateProduct);
router.delete('/:id', authorization, ProductController.deleteProduct);

module.exports = router;
