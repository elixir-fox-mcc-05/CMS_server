const { User } = require('../models')

function authorization (req, res, next) {
    let id  = req.UserId
console.log(id)
    User.findByPk(id)
        .then(user => {
            if(user){
                // console.log(user.role)
                if(user.role == "Admin"){
                    return next()
                }else{
                    res.status(401).json({
                        message : 'Unauthorized to use this feature!'
                    })
                }
            }else{
                res.status(404).json({
                    message : 'title not Found'
                })
            }
        })
        .catch(err => {
            return next(err)
        })
}



module.exports = authorization;