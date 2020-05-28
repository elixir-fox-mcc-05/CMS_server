const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');
const authentication = require('../middlewares/authentication');
const { authorizationSpecial } = require('../middlewares/authorization');

router.post('/signin', UserController.signIn);
router.post('/signup', UserController.signUp);
router.get('/allusers', authentication, authorizationSpecial, UserController.findAllUsers);
router.delete('/banuser/:id', authentication, authorizationSpecial, UserController.banUser);

module.exports = router;
