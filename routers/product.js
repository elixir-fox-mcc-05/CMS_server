let router = require('express').Router()
let ProductController = require('../controllers/product')

router.post('/add', ProductController.addProduct)

module.exports = router