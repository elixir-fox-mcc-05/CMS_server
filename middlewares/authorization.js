const { verify } = require('../helpers/jwt')

function authorization(req, res, next){
    let decoded = verify(req.headers.access_token)
    let role = decoded.role
    if(role == 'admin'){
        return next()
    }
    else {
        return next({
            name : 'Unauthorized',
            errors: [{message: "User not authorized"}]
        })
    }
}

module.exports = authorization