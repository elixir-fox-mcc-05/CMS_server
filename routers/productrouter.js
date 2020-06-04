'use strict'

const router = require(`express`).Router() 
const ProductController = require(`../controllers/productcontroller`)
const { authenticate, authorize } = require(`../middlewares/userauth`)

router.get(`/`, ProductController.getAll)
router.get(`/limit/:amount`, ProductController.getLimitedAll)
router.get(`/all/:categoryid`, ProductController.getAllbyCategory)
router.get(`/single/:id`, ProductController.getOneProduct)
router.get(`/owned`, authenticate, ProductController.getOneMerchant)

router.post(`/add`, authenticate, ProductController.addProduct)
router.post(`/checkout`, authenticate, ProductController.checkoutProduct)
router.put(`/edit`, authenticate, authorize, ProductController.editProduct)
router.delete(`/delete`, authenticate, authorize, ProductController.removeProduct)

module.exports = router
