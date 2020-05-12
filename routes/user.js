const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');

router.post('/signin', UserController.signIn);
router.post('/signup', UserController.signUp);

module.exports = router;
