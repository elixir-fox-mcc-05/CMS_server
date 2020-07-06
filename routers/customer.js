const router = require('express').Router();
const CustomerController = require('../controllers/customer.js');

router.post('/register', CustomerController.register);
router.post('/login', CustomerController.login);

module.exports = router;
