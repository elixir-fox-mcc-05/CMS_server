'use strict'
const { User } = require(`../models`)
const { verifyHash } = require(`../helpers/bcrypt`)
const { generateToken } = require(`../helpers/jwt`)
class UserController {

    static getAll ( req, res) {
        User.findAll({})
            .then( result => {
                res.status(201).json({
                    result
                })
            })
            .catch( err => {
                res.status(500).json({
                    err
                })
            })
    }
    static userRegister( req, res) {
        const { name, email, password, role} = req.body
        User.create({
            name,
            email,
            password,
            role
        })  .then( result => {
            res.status(201).json({
                id : result.id,
                name : result.name,
                email : result.email
            })
        })  .catch( err => {
            res.status(500).json({
                error : err.message
            })
        })
    }

    static login( req, res) {
        const { email, password } = req.body
        User.findOne({
            where : {
                email : email
            }
        })  .then ( result => {
                if(result){
                    if(verifyHash(password, result.password)){
                        let user = {
                            id : result.id,
                            name : result.name,
                            role : result.role
                        }
                        res.status(200).json({
                            cmsaccesstoken : generateToken(user)
                        })
                    } else {
                        res.status(400).json({
                            error : `Invalid email & password combination`
                        })
                    }
                } else {
                    res.status(500).json({
                        error : `Unregistered email supplied`
                    })
                }
        })  .catch( err => {
            error : err.message
        })
    }
}

module.exports = UserController