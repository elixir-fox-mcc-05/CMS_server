const router = require('express').Router();
const ProductController = require('../controllers/product.js');
const { authenticateUser } = require('../middlewares/authentication.js');
const { authorizeAdmin } = require('../middlewares/authorization.js');

router.use(authenticateUser);
router.get('/', ProductController.showAllProducts);
router.post('/', ProductController.addNewProduct);
router.put('/:id', authorizeAdmin, ProductController.updateProduct);
router.delete('/:id', authorizeAdmin, ProductController.deleteProduct);

module.exports = router;
