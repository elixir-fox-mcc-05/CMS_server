const router = require('express').Router()
const controllerCustomer = require('../controllers/customer')
router.post('/register', controllerCustomer.register);
router.post('/login', controllerCustomer.login);
module.exports = router