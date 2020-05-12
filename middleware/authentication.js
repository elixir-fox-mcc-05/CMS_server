const {verifyToken} = require('../helpers/jwt')
const {User} = require('../models')
function authentication(req,res,next){
    console.log(req.headers.token)
    let token = req.headers.token
    try{
        if(token){
            // console.log('liu')
            let decodeid = verifyToken(token)
            console.log(decodeid)
            let {id} = decodeid.data
            
            User
                .findByPk(id)
                .then(data => {
                    if(data){
                        // console.log(data)
                        req.LoginId = data.id
                        req.SelectOrganization = data.organization 
                        next()
                    }else{
                        req.status(404).json({
                            err : 'authentication data invalid, please login again'
                        })
                    }
                })
                .catch(err => {
                    res.status(404).json({
                        err : 'authentication error, please login again'
                    })
                })

        }else{
            res.status(404).json({
                err : 'please login first'
            })
        }
    }
    catch{
        throw err
    }
}

module.exports = authentication