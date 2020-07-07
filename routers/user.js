let router = require('express').Router()
let userController = require('../controllers/user')

router.get('/' ,userController.balance)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/topUp', userController.topUp)
router.put('/rendem', userController.rendem)

module.exports = router