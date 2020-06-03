const { User } = require("../models/index.js")
const { comparePassword } = require("../helpers/bcrypt.js")
const { createToken } = require("../helpers/jwt.js")

class userController {
    static register(req,res,next){
        let newUser = {
            email: req.body.email,
            password: req.body.password,
            role: "customer"
        }
        User.create(newUser)
            .then(result =>{
            // setelah user di-register, kita akan
                res.status(201).json({
                    message: "New customer successfully registered",
                    id: result.id,
                    email: result.email
                })
            })
            .catch(error =>{
                next(error)
            })
    }
    static login (req,res,next){
        let loggingUser = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({
            where:{
                email: loggingUser.email
            }
        })
        .then(result => {
            // console.log(result)
            if(result){
                let passwordMatch = comparePassword(loggingUser.password, result.password)
                if(passwordMatch){
                    //buatkan token
                    let payload = {
                        id : result.id,
                        email : result.email,
                    }
                    let access_token = createToken(payload)
                    res.status(200).json({
                        id: result.id,
                        email: result.email,
                        access_token
                    })
                } else {
                    next({
                        message:"BadRequest",
                        error:"Invalid password/email"
                    })
                }
            } else {
                next({
                    message:"BadRequest",
                    error:"Invalid password/email"
                })
            }
            
        })
        .catch(err =>{
            next(err)
        })
    }
}

module.exports = userController