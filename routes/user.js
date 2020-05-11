"use strict";

const router = require('express').Router();
const ControllerUser = require('../controller/ControllerUser');

router.get("/", (req, res) => {
    res.status(200).json({
        masuk : "Masuk Pak Eko"
    })
});

module.exports = router;