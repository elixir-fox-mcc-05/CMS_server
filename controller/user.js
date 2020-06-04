const Model = require('../models')
const User = Model.User
const {checkPassword} = require('../helpers/bcrypt.js')
const {generateToken} = require('../helpers/jwt.js')

class UserController {
    static register(req, res, next){
    const {email, password} = req.body;
    User.create({ email, password })
        .then(user => {
            res.status(201).json({
                id : user.id,
                email : user.email
            })
        })
        .catch(err => {
            return next(err)
        })
    }
    static logIn(req, res, next) {
        const {email, password} = req.body

        User.findOne({
            where : {email}
        })
            .then(result => {
                if(result){
                    let compare = checkPassword(password, result.password)
                    if(compare){
                        let token = generateToken({
                            id : result.id,
                            email : result.email,
                        })
                        res.status(200).json({
                            id : result.id, email : result.email, token
                        })
                    }else{
                        throw {
                            message : 'email or password wrong',
                            code : 401
                        }
                    }
                }else{
                    throw {
                        message : 'Email and Password not found',
                        code : 404
                    }
                }
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = UserController;