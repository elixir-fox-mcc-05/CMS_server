const router = require('express').Router()
const UserController = require('../controllers/user')

router.post('/login', UserController.login)
router.post('/register', UserController.register)

module.exports = router