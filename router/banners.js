const router = require('express').Router()
const BannerController = require('../controllers/bannerController')
const authentication = require('../middleware/authentication')

router.get('/list',BannerController.list)

router.use(authentication)
router.get('/:id',BannerController.select)
router.post('/add',BannerController.create)
router.put('/:id',BannerController.edit)
router.delete('/delete/:id',BannerController.delete)



module.exports = router 