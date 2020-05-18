const router = require('express').Router()
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const UserProductController = require('../controllers/UserProductController')
router.use(authentication)
router.get('/', UserProductController.findAll)
router.get('/checkout', UserProductController.showCheckout)
router.post('/', UserProductController.add)
router.get('/:id', UserProductController.findOne)
router.put('/checkout/:id', UserProductController.checkout)
router.put('/edit/:id', authorization, UserProductController.edit)
router.delete('/delete/:id', UserProductController.delete)

module.exports = router