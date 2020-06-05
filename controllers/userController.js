'use strict'

const {User} = require('../models');
const {compare} = require('../helpers/bcrypt.js');
const {userToken} = require('../helpers/jwt.js')

class UserController {
    static register(req, res, next) {
        let {email, password, role} = req.body;

        User.create({
            email,
            password,
            role
        })
            .then(result => {
                res.status(201).json({
                    id: result.id,
                    email: result.email
                });
            })
            .catch(err => {
                next(err)
            });
    }

    static login(req, res, next) {
        let {email, password} = req.body;
        
        User.findOne({
            where: {
                email
            }
        })
            .then(result => {
                if (result) {
                    let check = compare(password, result.password);
                    if (check) {
                        let token = userToken({
                            id: result.id,
                            email: result.email
                        })
                        res.status(200).json({token});
                    }
                    else {
                        throw {
                            message: `Email or Password is wrong`,
                            code: 401
                        };
                    }
                }
                else {
                    throw {
                        message: `Register first`,
                        code: 400
                    }
                }
            })
            .catch(err => {
                // console.log(err)
                next(err)
            })
    }

}

module.exports = UserController;