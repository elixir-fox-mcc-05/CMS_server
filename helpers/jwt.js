let jwt = require('jsonwebtoken');

function jwtToken (password) {
    return jwt.sign(password, 'yadigituin');
}

function verifyToken (token) {
    return jwt.verify(token, 'yadigituin');
}

module.exports = {jwtToken, verifyToken}