let { verifyToken } = require('../helpers/jwt.js')
let { User } = require('../models')

function authentication (req,res,next) {
    let token = req.headers.token

    if(!token) {
        res.status(401).json({
            msg : 'please login first'
        })
    } else {
        let user = verifyToken(token)
        User.findByPk(user.id)
        .then(result=>{
            if(result) {
                next()
            } else {
                res.status(401).json({
                    msg : 'please login first'
                })
            }
        })
        .catch(err=>{
            res.status(500).json({
                msg : 'internal server error'
            })
        })
    }

}

module.exports = authentication
