const router = require('express').Router();
const UserController = require('../controllers/userController')
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorizationUser");

router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.use(authentication)
router.get('/user-list', authorization, UserController.showUser)
router.get("/user/:id", authorization, UserController.findOne);
router.patch('/user/:id', authorization, UserController.updateRoleUser)
router.delete("/user/:id", authorization, UserController.delete);

module.exports = router;
