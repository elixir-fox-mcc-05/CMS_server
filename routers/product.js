let router = require('express').Router()
let ProductController = require('../controllers/product')
let {authentification} = require('../middlewares/authentification')

router.get('/', ProductController.showAllProduct)
router.use(authentification)
router.post('/', ProductController.addProduct)
router.delete('/:id', ProductController.delete)
router.put('/:id', ProductController.restock)
router.get('/detail/:id', ProductController.detailProduct)
router.post('/cart/:id', ProductController.addCart)
router.get('/cart', ProductController.myCart)


module.exports = router