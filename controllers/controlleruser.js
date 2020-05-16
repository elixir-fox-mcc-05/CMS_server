"use strict"

const Model = require("../models/index.js");
const {checkPassword} = require("../helpers/bcrypt.js");
const {generateToken} = require("../helpers/jwt.js");
// const googleVerification = require('../helpers/googleOauthApi.js');

const User = Model.User;

class ControllerUser{
    static signup(req, res, next){
        let {email, password} = req.body;

        User.create({
            email,
            password
        })
        .then(data => {
            res.status(201).json({
                id: data.id,
                email: data.email
            })
        })
        .catch(err => {
            return next({
                name: "InternalServerError",
                errors: [{message: err}]
            });
        })
    }
    static signin(req, res, next){
        let {email, password} = req.body;
        
        User.findOne({
          where: {
            email
          }
        })
        .then(result => {
          if(result){
            let compare = checkPassword(password, result.password);
            
            console.log(compare)
            if(compare){
                    let token = generateToken({
                        id: result.id,
                        email: result.email
                    })
                    res.status(200).json({
                        token
                    })
                }
                else{
                    return next({
                        name: "BadRequest",
                        errors: [{message: "Invalid email or password"}]
                    })
                }
            }
            else{
                return next({
                    name: "BadRequest",
                    errors: [{message: "Invalid email or password"}]
                })
            }
        })
        .catch(err => {
            return next({
                name: "InternalServerError",
                errors: [{message: err}]
            });
        })
    }
    // static googlesignin(req, res, next) {
    //     let google_token = req.headers.google_token;
    //     let email = null;
    //     let newUser = false;
    
    //     googleVerification(google_token)
    //       .then(payload => {
    //         email = payload.email;
    //         console.log(email)
    //         return User
    //           .findOne({
    //             where: {
    //               email
    //             }
    //           })
    //       })
    //       .then(user => {
    //         if (user) {
    //           return user;
    //         } else {
    //           newUser = true;
    //           return User
    //             .create({
    //               email,
    //               password: process.env.DEFAULT_GOOGLE_PASSWORD
    //             });
    //         }
    //       })
    //       .then(user => {
    //         let code = newUser ? 201 : 200;
    
    //         const token = generateToken({
    //           id: user.id,
    //           email: user.email
    //         });
    
    //         res.status(code).json({
    //           token
    //         });
    //       })
    //       .catch(err => {
    //         next(err);
    //       })
    //   }
}
module.exports = ControllerUser;