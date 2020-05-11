"use strict";

const jwt = require('jsonwebtoken');

function generateToken(payload){
    return jwt.sign(payload, process.env.secret);
}

function verifyToken(token){
    return jwt.verify(token, process.env.secret);
}

module.exports = {generateToken, verifyToken};