const router = require('express').Router()
const TransactionController = require('../controller/transaction.js')
const { authentication } = require('../middleware/authentication.js')

router.use(authentication)
router.post('/', TransactionController.addTransaction)
router.get('/', TransactionController.getAll)
router.get('/history', TransactionController.getHistory)
router.delete('/:id', TransactionController.deleteCart)
router.put('/:id', TransactionController.updateTransaction)

module.exports = router