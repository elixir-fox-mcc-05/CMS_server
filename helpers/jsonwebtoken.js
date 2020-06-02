const jwt = require('jsonwebtoken')

function generate_token(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET)
}

function verify_token(token) {
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = { generate_token, verify_token }