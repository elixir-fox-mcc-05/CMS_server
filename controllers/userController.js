const {User} = require('../models')
const {verifyToken, generateToken} = require('../helpers/jwt')
const {encrypt, compare} = require('../helpers/bcrypt')

class UserController{
    static login(req,res){

    }

    static register(req,res){
        let {first_name,last_name,email,password} = req.body
        let roles = 'admin'

        User
            .create({first_name,last_name,email,password,roles})
            .then(data => {
                res.status(201).json({
                    id: data.id,
                    first_name : data.first_name,
                    last_name : data.last_name,
                    email : data.email,
                    roles : data.roles
                })
            })
            .catch(err => {
                let errorfix = err.message.replace('Validation error: ', '')
                res.status(400).json({
                    error : errorfix
                })
            })
    }
}

module.exports = UserController