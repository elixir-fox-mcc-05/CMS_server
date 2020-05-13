const router = require('express').Router()
const controller = require('../controllers/ProductController.js')

router.get('/', controller.findAll)
router.post('/', controller.create)

module.exports = router
