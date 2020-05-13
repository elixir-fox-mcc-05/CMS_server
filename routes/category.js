const router = require('express').Router();
const CategoryController = require('../controllers/CategoryController.js');
const authentication = require('../middlewares/authentication.js');
const adminAuth = require('../middlewares/adminauth.js');

router.use(authentication);
router.get('/', adminAuth, CategoryController.findAll);
router.post('/', adminAuth, CategoryController.createCategory);
router.put('/:id', adminAuth, CategoryController.updateCategory);
router.delete('/:id', adminAuth, CategoryController.deleteCategory);

module.exports = router;