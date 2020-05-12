let jwt = require('jsonwebtoken');

function jwtToken (password) {
    return jwt.sign(password, process.env.SECRET);
}

function verifyToken (token) {
    return jwt.verify(token, process.env.SECRET);
}

module.exports = {jwtToken, verifyToken}