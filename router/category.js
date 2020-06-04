const router = require('express').Router()
const CategoryControll = require('../controller/Category.js')
const { authentication } = require('../middleware/authentication.js')
const  authorization  = require('../middleware/authorization.js')

router.get('/', CategoryControll.findAll)
router.use(authentication)
router.post('/', authorization,CategoryControll.createCategory)
router.put('/:id', authorization,CategoryControll.updateCategory)
router.delete('/:id', authorization,CategoryControll.deleteCategory)


module.exports = router