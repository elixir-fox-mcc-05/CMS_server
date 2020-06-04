const {User} = require('../models')
const {comparePassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')

class UserController{
    static register(req, res, next){
        let {email, password} = req.body
        let newUser = {
            email, 
            password
        }
        User.create(newUser)
            .then(data => {
                let {id, email} = data
                res.status(201).json({
                    id, 
                    email
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next){
        let {email, password} = req.body
        User.findOne({where: {email}})
            .then(data => {
                if(data){
                    if(comparePassword(password, data.password)){
                        let {id, email, role} = data
                        let access_token = generateToken({
                            id, 
                            email,
                            role
                        })
                        res.status(200).json({
                            access_token
                        })
                    } else {
                        throw{
                            code: 400,
                            message: `password not match`
                        }
                    }
                } else {
                    throw{
                        code: 400,
                        message: `data not found`
                    }
                }
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }

    static adminLogin(req, res, next){
        let {email, password} = req.body
        User.findOne({where: {email}})
            .then(data => {
                if(data){
                    if(comparePassword(password, data.password)){
                        let {id, email, role} = data
                        if(role == 'admin'){
                            let access_token = generateToken({
                                id, 
                                email,
                                role
                            })
                            res.status(200).json({
                                access_token
                            })
                        } else {
                            throw{
                                code: 400,
                                message: `Please use admin account`
                            }
                        }
                    } else {
                        throw{
                            code: 400,
                            message: `password not match`
                        }
                    }
                } else {
                    throw{
                        code: 400,
                        message: `data not found`
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController