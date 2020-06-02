const router = require('express').Router()
const UserController = require('../controllers/userController')
const admin_authentication = require('../middlewares/admin_auth')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.get('/indetify', admin_authentication)

module.exports = router