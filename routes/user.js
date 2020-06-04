"use strict";

const router = require('express').Router();
const ControllerUser = require('../controller/ControllerUser');
const Authentication = require('../middlewares/authentication');

router.post("/login", ControllerUser.login);
router.post("/register", ControllerUser.register);
router.use(Authentication)
router.put("/topup", ControllerUser.topup);
router.put("/transaction", ControllerUser.transaction)

module.exports = router;