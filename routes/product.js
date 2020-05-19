const router = require('express').Router()
const Controller = require('../controller/product')

const Authen = require('../middleware/authen')


router.use(Authen)
router.post('/', Authen, Controller.addProduct)



module.exports = router