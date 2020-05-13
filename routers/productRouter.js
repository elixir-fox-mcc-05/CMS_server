const router = require('express').Router()
const controller = require('../controllers/ProductController.js')

router.post('/', controller.create)
router.get('/', controller.findAll)
router.get('/:id', controller.findOne)
router.put('/:id', controller.update)

module.exports = router
