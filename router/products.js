const router = require('express').Router()
const ProductController = require('../controllers/productController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')
const multer  = require('multer')
const upload = multer({})

router.use(authentication)

router.get('/list',ProductController.list)
router.get('/:id',authorization,ProductController.select)
router.post('/add',upload.single('image_url'),ProductController.add)
router.put('/edit/:id',authorization,ProductController.edit)
router.delete('/delete/:id',authorization,ProductController.delete)
router.post('/search',ProductController.search)

module.exports = router