const router = require('express').Router();
const ProductController = require('../controllers/productController.js');
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js')

router.use(authentication);
router.get('/', ProductController.findAll);
router.post('/', authorization, ProductController.createProduct);
router.get('/:id', ProductController.findOne);
router.put('/:id', authorization, ProductController.updateProduct);
router.delete('/:id', authorization, ProductController.deleteProduct);

module.exports = router;