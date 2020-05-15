const router = require('express').Router()
const CategoryController = require('../controllers/categoryController')
const authentication = require('../middleware/authentication')

router.use(authentication)

router.get('/',CategoryController.list)
router.post('/add',CategoryController.add)
router.put('/edit/:id',CategoryController.edit)
router.delete('/delete/:id',CategoryController.delete)

module.exports = router