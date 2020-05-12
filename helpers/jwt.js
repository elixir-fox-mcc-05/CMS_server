const jwt = require('jsonwebtoken')

let secret = process.env.SECRET

const generateToken = (payload) => {
    let token = jwt.sign(payload, secret)
    return token
}

const verifyToken = (token) => {
    return jwt.verify(token, secret)
}

module.exports = {
    generateToken,
    verifyToken
}