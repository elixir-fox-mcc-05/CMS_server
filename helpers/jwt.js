let jwt = require('jsonwebtoken')

function getToken(payload) {
    let token = jwt.sign( payload , process.env.SECRET );
    return token
}

function verifyToken(payload) {
    var decoded = jwt.verify(payload, process.env.SECRET);
    return decoded
}


module.exports = {
    getToken,
    verifyToken
}
