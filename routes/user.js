const router = require('express').Router()
const controllerUser = require('../controllers/user')
router.post('/register', controllerUser.register);
router.post('/login', controllerUser.login);
module.exports = router