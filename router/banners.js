const router = require('express').Router()
const BannerController = require('../controllers/bannerController')
const authentication = require('../middleware/authentication')
const authorizationBanner = require('../middleware/authorizationBanner')
const multer  = require('multer')
const upload = multer({}) 

router.get('/list',BannerController.list)

router.use(authentication)
router.get('/:id',authorizationBanner,BannerController.select)
router.post('/add/test',BannerController.createTest)
router.post('/add',upload.single('image_url'),BannerController.create)
router.put('/:id',authorizationBanner,BannerController.edit)
router.delete('/delete/:id',authorizationBanner,BannerController.delete)



module.exports = router 