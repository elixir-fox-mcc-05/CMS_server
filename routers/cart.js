const router = require('express').Router()
const CartController = require('../controllers/cartController')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.post('/', CartController.addCart)
router.get('/', CartController.getCart)
router.delete('/', CartController.checkout)

module.exports = router