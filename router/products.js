const router = require('express').Router()
const ProductController = require('../controllers/productController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.use(authentication)

router.get('/list',ProductController.list)
router.get('/:id',authorization,ProductController.select)
router.post('/add',ProductController.add)
router.put('/edit/:id',authorization,ProductController.edit)
router.delete('/delete/:id',authorization,ProductController.delete)
router.post('/search',ProductController.search)

module.exports = router