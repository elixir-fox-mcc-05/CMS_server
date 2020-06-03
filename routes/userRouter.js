const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.post('/login/customer', UserController.loginCustomer)

module.exports = router;