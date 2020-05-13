const router = require('express').Router()
const controller = require('../controllers/ProductController.js')

router.get('/', controller.findAll)
router.post('/', controller.create)
router.put('/:id', controller.update)

module.exports = router
