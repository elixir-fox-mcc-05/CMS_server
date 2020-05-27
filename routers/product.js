let router = require('express').Router()
let ProductController = require('../controllers/product')
let {authentification} = require('../middlewares/authentification')

router.get('/', ProductController.showAllProduct)
router.use(authentification)
router.post('/', ProductController.addProduct)
router.delete('/:id', ProductController.delete)
router.put('/:id', ProductController.restock)
router.get('/detail/:id', ProductController.detailProduct)
router.post('/cart', ProductController.addCart)
router.get('/cart', ProductController.myCart)
router.delete('/cart/delete', ProductController.delCart)
router.put('/cart/update', ProductController.demand)
router.put('/cart/check', ProductController.check)
router.put('/cart/buy', ProductController.buy)
router.get('/history', ProductController.history)

module.exports = router