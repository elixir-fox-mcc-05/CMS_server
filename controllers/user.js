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
                if (result.password === req.body.password) {
                    let { id , username } = result
                    let token = getToken({id,username})
                    res.status(200).json({
                        token
                    })
                } else {
                    res.status(400).json({
                        msg : 'wrong username/password'
                    })
                }
            }
        })
        .catch(err=>{
            res.status(500).json({
                msg : 'Internal server error'
            })
            console.log(err)
        })
    }

}


module.exports = UserCon