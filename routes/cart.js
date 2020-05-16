const router = require('express').Router()
const CartController = require('../controllers/cartController.js')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.get('/', CartController.findAll)
router.post('/', CartController.create)
router.delete('/:CartId', CartController.delete)

module.exports = router