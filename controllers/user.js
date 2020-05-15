let { User } = require('../models')
let { getToken } = require('../helpers/jwt.js')

class UserCon {
    static login(req,res) {
        User.findOne({
            where : {
                username : req.body.username
            }
        })
        .then(result=>{
            if(!result) {
                res.status(400).json({
                    msg : 'wrong username/password'
                })
            } else {
                let { id , username } = result
                let token = getToken({id,username})
                res.status(200).json({
                    token
                })
            }
        })
        .catch(err=>{
            res.status(500).json({
                msg : 'Internal server error'
            })
        })
    }

}


module.exports = UserCon