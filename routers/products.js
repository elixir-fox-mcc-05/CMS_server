const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const Auth = require('../middlewares/adminAuth')
router.get('/', ProductController.findAll)
router.post('/', Auth, ProductController.addProduct)
router.get('/:id', ProductController.findOne)
router.get('/genre/:genre', ProductController.findByGenre)
router.put('/edit/:id', Auth, ProductController.editProduct)
router.delete('/delete/:id', Auth, ProductController.deleteProduct)

module.exports = router