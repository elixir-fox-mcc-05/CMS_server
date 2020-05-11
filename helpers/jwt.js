const jwt = require('jsonwebtoken')

function generateToken(data) {
    let token = jwt.sign(data, process.env.SECRET)
    return token
}
function verifyToken(token){
    return jwt.verify(token, process.env.SECRET)
}


module.exports = {generateToken, verifyToken}