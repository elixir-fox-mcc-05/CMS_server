const jwt = require('jsonwebtoken');

function createToken (payload){
    const token = jwt.sign(payload, process.env.SECRET);
    return token 
}

function verifyToken (token) {
    const verified = jwt.verify(token, process.env.SECRET);
    return verified
}

module.exports = {createToken, verifyToken}
