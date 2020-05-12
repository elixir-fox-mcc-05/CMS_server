const router = require('express').Router()
const ProductController = require('../controllers/productController')


router.get('/list',ProductController.list)
router.get('/:id',ProductController.select)
router.post('/add',ProductController.add)
router.put('/edit/:id',ProductController.edit)
router.delete('/delete/:id',ProductController.delete)
router.post('/search/:name',ProductController.search)

module.exports = router