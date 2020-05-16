const router = require('express').Router();
const CategoryController = require('../controllers/category.js');
const { authenticateUser } = require('../middlewares/authentication.js');
const { authorizeAdmin } = require('../middlewares/authorization.js');

router.use(authenticateUser);
router.get('/', CategoryController.showAllCategory);
router.post('/', CategoryController.addNewCategory);
router.put('/:id', authorizeAdmin, CategoryController.updateCategory);
router.delete('/:id', authorizeAdmin, CategoryController.deleteCategory);

module.exports = router;
