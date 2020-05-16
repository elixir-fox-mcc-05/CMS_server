const router = require('express').Router();
const CategoryController = require('../controllers/category.js');
const { authenticateUser } = require('../middlewares/authentication.js');

router.use(authenticateUser);
router.get('/', CategoryController.showAllCategory);
router.post('/', CategoryController.addNewCategory);
router.put('/:id', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;
