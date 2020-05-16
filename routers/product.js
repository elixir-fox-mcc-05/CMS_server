const router = require('express').Router();
const ProductController = require('../controllers/product.js');
const { authenticateUser } = require('../middlewares/authentication.js');
const { authorizeAdmin, authorizeAdminOnProduct } = require('../middlewares/authorization.js');

router.use(authenticateUser);
router.get('/', ProductController.showAllProducts);
router.use(authorizeAdmin);
router.post('/', ProductController.addNewProduct);
router.put('/:id', authorizeAdminOnProduct, ProductController.updateProduct);
router.delete('/:id', authorizeAdminOnProduct, ProductController.deleteProduct);

module.exports = router;
