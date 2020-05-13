const { verifyToken } = require('../helpers/jwt.js')
const { User } = require('../models')

function authentication(req, res, next) {
    let token = req.headers.token
    if(!token){
        return next({
            code : 400,
            message : "Please Login First"
        })
    }else{
        try {
            let decoded = verifyToken(token)
            let {id} = decoded
            
            User.findByPk(id)
                .then(data => {
                    // console.log(data)
                    if(data){
                        req.UserId = id
                        next()
                    }else{
                        throw{
                            message : 'Authenticated Error',
                            code : 401
                        }
                    }
                })
                .catch(err => {
                    next(err)
                })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {authentication}