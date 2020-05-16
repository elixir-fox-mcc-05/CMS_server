const router = require('express').Router()
const controllerTransaction = require("../controllers/transaction")
const AuthenCustomer = require("../middlewares/authenCustomer")

router.post('/',AuthenCustomer,controllerTransaction.addCart)
router.put('/',AuthenCustomer,controllerTransaction.confirm)
router.delete('/',AuthenCustomer,controllerTransaction.delete)
router.get('/pending',AuthenCustomer,controllerTransaction.viewpending)
router.post('/mail',controllerTransaction.mail)
// router.get('/:id',Authen,Author,controllerProduct.viewone)

module.exports = router