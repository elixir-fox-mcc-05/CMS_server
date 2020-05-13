const { User } = require('../models')

function authorization (req, res, next) {
    let id  = req.UserId
// console.log(id)
    User.findByPk(id)
        .then(user => {
            if(user){
                if(user.role == "Admin"){
                    next()
                }else{
                    res.status(401).json({
                        msg : 'Unauthorized'
                    })
                }
            }else{
                res.status(404).json({
                    msg : 'title not Found'
                })
            }
        })
        .catch(err => {
            next(err)
        })
}



module.exports = authorization;