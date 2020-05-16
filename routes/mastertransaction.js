const router = require('express').Router()
const controllermaster = require("../controllers/master_transaction")
const AuthenCustomer = require("../middlewares/authenCustomer")

router.post('/',controllermaster.addmaster)
// router.put('/:id',Authen,Author,controllerProduct.Edit)
// router.delete('/:id',Authen,Author,controllerProduct.delete)
// router.get('/pending',AuthenCustomer,controllerTransaction.viewpending)
// router.get('/:id',Authen,Author,controllerProduct.viewone)

module.exports = router