const express = require('express')
const router = express.Router()
const ShoppingChartController = require('../controllers/ShoppingChartController.js')
const authentication = require('../middlewares/authentication.js')

router.post('/checkout', authentication, ShoppingChartController.checkout)
router.delete('/:id', authentication, ShoppingChartController.deleteShoppingChart)
router.get('/', authentication, ShoppingChartController.findShoppingChart)
router.post('/', authentication, ShoppingChartController.createShoppingChart)

module.exports = router