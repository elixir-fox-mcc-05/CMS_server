const router = require('express').Router()
const authentication = require('../middlewares/authientication')
const CartController = require('../controllers/CartController')

router.use(authentication)

router.post('/', CartController.create)
router.get('/', CartController.read)

module.exports = router