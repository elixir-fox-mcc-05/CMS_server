const jwt = require('jsonwebtoken')

function generateToken(payload) {
    return jwt.sign(payload, 'Rahasia')
}

function verifyToken(token) {
    return jwt.verify(token, 'Rahasia')
}

module.exports = {
    generateToken,
    verifyToken
}