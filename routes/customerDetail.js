const router = require('express').Router()
const controllerCustomerDetail = require('../controllers/detail_customer')
const AuthenCustomer = require("../middlewares/authenCustomer")
router.post('/',AuthenCustomer,controllerCustomerDetail.addNew);
router.put('/', AuthenCustomer,controllerCustomerDetail.Edit);
router.get('/',AuthenCustomer,controllerCustomerDetail.viewall)
module.exports = router