const router = require('express').Router();
const CategoryController = require('../controllers/categoryController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization')

router.use(authentication);
router.get('/', CategoryController.findAll);
router.post('/', authorization, CategoryController.create);
router.put('/:id', authorization, CategoryController.update);

module.exports = router;