'use strict'

const router = require(`express`).Router() 
const ProductPictureController = require(`../controllers/productpicturecontroller`)
const { authenticate } = require(`../middlewares/userauth`)


router.post(`/add`, authenticate, ProductPictureController.addPicture)
router.delete(`/delete`, authenticate, ProductPictureController.removePicture)

router.get(`/`, ProductPictureController.getAll)
router.get(`/all/:productid`, ProductPictureController.getAllbyProductId)
router.get(`/single/:id`, ProductPictureController.getOnePicture)
router.get(`/merchant`, authenticate, ProductPictureController.getAllbyMerchant)


module.exports = router

