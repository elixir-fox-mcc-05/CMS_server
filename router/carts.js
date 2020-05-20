const router = require('express').Router()
const CartController = require('../controllers/cartController')
const authentication = require('../middleware/authentication')

router.use(authentication)
router.get('/list',CartController.list) //cms admin only
router.post('/add',CartController.add)
router.get('/checkout',CartController.checkout)
router.put('/confirm/:id',CartController.confirm)
router.put('/edit/:id',CartController.edit)
router.delete('/delete/:id',CartController.delete)




module.exports = router 