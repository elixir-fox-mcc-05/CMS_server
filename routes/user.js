"use strict";

const router = require('express').Router();
const ControllerUser = require('../controller/ControllerUser');

router.post("/login", ControllerUser.login);
router.post("/register", ControllerUser.register);

module.exports = router;