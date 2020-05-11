"use strict";
const {User} = require("../models");
const {comparePassword} = require("../helpers/bcrypt");
const {generateToken} = require("../helpers/jwt");

class ControllerUser {
    static login(req, res, next){
        const {email, password} = req.body;
        User
            .findOne({
                where : {
                    email
                }
            })
            .then(user => {
                if(user) {
                    if(comparePassword(password, user.password)){
                        let token = generateToken({
                            id : user.id,
                            email : user.email
                        });
                        res.status(202).json({
                            acces_token : token
                        });
                    } else {
                        return next({
                            type : "Bad Request",
                            code : 400,
                            msg : "Wrong Password"
                        });
                    }
                } else {
                    return next({
                        type : "Bad Request",
                        code : 400,
                        msg : "User Doesn't exist"
                    });
                }
            })
            .catch(err => {
                return next(err);
            });
    }
    static register(req, res, next){
        const {name, email, password, confirmPassword} = req.body;
        const value = {
            name,
            email,
            password
        };
        if(password !== confirmPassword){
            return next({
                type : "Bad Request",
                code : 400,
                msg : "Password and Confirm Password doesn't match"
            });
        }
        User
            .create(value)
            .then(user => {
                res.status(201).json({
                    id : user.id,
                    email : user.email
                });
            })
            .catch(err => {
                return next(err);
            });
    }
}

module.exports = ControllerUser;