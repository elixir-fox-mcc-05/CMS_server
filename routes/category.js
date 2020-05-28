const router = require('express').Router();
const CategoryController = require('../controllers/CategoryController.js');
const authentication = require('../middlewares/authentication.js');
const adminAuth = require('../middlewares/adminauth.js');

router.get('/', CategoryController.findAll);
router.get('/:id', CategoryController.getProducts);
router.use(authentication);
router.post('/', adminAuth, CategoryController.createCategory);
router.put('/:id', adminAuth, CategoryController.updateCategory);
router.delete('/:id', adminAuth, CategoryController.deleteCategory);

module.exports = router;