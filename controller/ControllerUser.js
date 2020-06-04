"use strict";
const {User, Role} = require("../models");
const {comparePassword} = require("../helpers/bcrypt");
const {generateToken} = require("../helpers/jwt");

class ControllerUser {
    static login(req, res, next){
        const {email, password} = req.body;
        User
            .findOne({
                where : {
                    email
                },
                include : Role
            })
            .then(user => {
                if(user) {
                    if(comparePassword(password, user.password)){
                        let token = generateToken({
                            id : user.id,
                            email : user.email
                        });
                        res.status(202).json({
                            acces_token : token,
                            Role : user.Role,
                            money: user.money,
                            name: user.name
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
                console.log(err)
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
    static topup(req, res, next) {
      const {money} = req.body
      User
        .increment(['money'], {by: money, where: {id: req.currentUser}})
        .then(data => {
          return User.findByPk(req.currentUser)
        })
        .then(data => {
          res.status(200).json({
            money: data.money,
            message: "Your balanced has been increased"
          })
        })
        .catch(err => {
          return next(err)
        })
    }
    static transaction(req, res, next) {
      const {money} = req.body
      User
        .decrement('money', {by: money, where: {id: req.currentUser}})
        .then(data => {
          return User.findByPk(req.currentUser)
        })
        .then(data => {
          res.status(200).json({
            money: data.money
          })
        })
        .catch(err => {
          return next(err)
        })
    }
}

module.exports = ControllerUser;