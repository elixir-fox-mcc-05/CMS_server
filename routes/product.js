const router = require('express').Router();
const ProductController = require('../controllers/ProductController.js');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization.js');

router.get('/all', ProductController.findAll);
router.use(authentication);
router.get('/', ProductController.findAllByUser);
router.get('/:id', ProductController.findOne);
router.post('/', ProductController.createProduct);
router.put('/:id', authorization, ProductController.updateProduct);
router.delete('/:id', authorization, ProductController.deleteProduct);

module.exports = router;
