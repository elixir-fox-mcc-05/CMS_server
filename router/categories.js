const router = require('express').Router()
const CategoryController = require('../controllers/categoryController')
const authentication = require('../middleware/authentication')
const authorizationCategory = require('../middleware/authorizationCategory') 

router.use(authentication)

router.get('/',CategoryController.list)
router.get('/:id',authorizationCategory,CategoryController.select)
router.post('/add',CategoryController.add)
router.put('/edit/:id',authorizationCategory,CategoryController.edit)
router.delete('/delete/:id',authorizationCategory,CategoryController.delete)

module.exports = router