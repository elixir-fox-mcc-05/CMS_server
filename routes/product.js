const router = require('express').Router()
const controllerProduct = require("../controllers/product")
const Author = require("../middlewares/author")
const Authen = require("../middlewares/authen")

router.post('/',Authen,Author,controllerProduct.addNew)
router.put('/:id',Authen,Author,controllerProduct.Edit)
router.delete('/:id',Authen,Author,controllerProduct.delete)
router.get('/',controllerProduct.viewall)
router.get('/:id',Authen,Author,controllerProduct.viewone)
router.get('/customer/all',controllerProduct.viewallcustomer)

module.exports = router