const { User } = require('../models')
const { verify } = require('../helpers/jwt')

function authentication (req, res, next){
    try{
        let decoded = verify(req.headers.access_token)
        User.findOne({
            where: {
                id: decoded.id
            }
        })
        .then(result => {
            if(result){
                req.currentUserId = result.id
                next()
            }
            else {
                return next({
                    name: 'Not Found',
                    errors: [{message: "User Not Found"}]
                })
            }
        })
        .catch(err => {
            return next({
                name: 'Unauthorized',
                errors: [{message: "User not authorized"}]
            })
        })
    }

    catch(err){
        return next({
            name: 'JsonWebTokenError',
            errors: [{message: "Please login first"}]
        })

    }

}

module.exports = authentication