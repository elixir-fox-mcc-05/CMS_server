const router = require('express').Router()
const UserController = require('../controller/user.js')

router.post('/register', UserController.register)
router.post('/', UserController.logIn)


module.exports = router;