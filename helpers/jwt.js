const jwt = require('jsonwebtoken')

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET)
}

const decode = (token) => {
    return jwt.verify(token, process.env.SECRET)
}

module.exports = { generateToken, decode }