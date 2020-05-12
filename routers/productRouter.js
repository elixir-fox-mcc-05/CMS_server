const router = require('express').Router()
const controller = require('../controllers/ProductController.js')

router.get('/', controller.findAll)

module.exports = router
