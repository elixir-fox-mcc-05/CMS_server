const { User } = require('../models/index');
const { checkPassword } = require('../helpers/bcryptjs');
const { generateToken } = require('../helpers/jwt');
const vertifyGoogle = require('../helpers/googleOauth');

class UserController {
    // router.post('/register', UserController.registerUser);
    static registerUser(req, res, next){
        let { email, password } = req.body;
        let input = {
            email,
            password
        };
        User.create(input)
            .then(data => {
                res.status(201).json({
                    id: data.id,
                    email: data.email,
                    role: data.role
                });
            })
            .catch(err => {
                next(err);
            })
    }

    // router.post('/login', UserController.loginUser);
    static loginUser(req, res, next){
        let { email, password } = req.body;
        let options = {
            where: {
                email,
                role: 'admin'
            }
        }
        User.findOne(options)
            .then(data => {
                if(data){
                    let compare = checkPassword(password, data.password);
                    if(compare) {
                        let token = generateToken({
                            id: data.id,
                            email: data.email
                        })
                        res.status(201).json({
                            token
                        })
                    }
                    else {
                        return next({
                            name: `BadRequest`,
                            errors: [{
                                message: `Invalid E-mail/Password`
                            }]
                        })
                    }
                }
                else {
                    return next({
                        name: `BadRequest`,
                        errors: [{
                            message: `Invalid E-mail/Password`
                        }]
                    })
                }
            })
            .catch(err => {
                return next(err)
            })
    }

    // router.post('/login/customer', UserController.loginCustomer)
    static loginCustomer(req, res, next){
        let { email, password } = req.body;
        let options = {
            where: {
                email,
            }
        }
        User.findOne(options)
            .then(data => {
                if(data){
                    let compare = checkPassword(password, data.password);
                    if(compare) {
                        let token = generateToken({
                            id: data.id,
                            email: data.email
                        })
                        res.status(201).json({
                            token,
                            email: data.email
                        })
                    }
                    else {
                        return next({
                            name: `BadRequest`,
                            errors: [{
                                message: `Invalid E-mail/Password`
                            }]
                        })
                    }
                }
                else {
                    return next({
                        name: `BadRequest`,
                        errors: [{
                            message: `Invalid E-mail/Password`
                        }]
                    })
                }
            })
            .catch(err => {
                return next(err)
            })
    }

    // router.post('/google-login', UserController.googleLogin)
    static googleLogin(req, res, next){
        let googleToken = req.body.headers.googleToken
        let email = null
        let newUser = false;
        verifyGoogle(googleToken)
            .then(payload => {
                email = payload.email
                let options = {
                    where: {email}
                }
                return User.findOne(options)
            })
            .then(user => {
                if(user){
                    return user
                }
                else {
                    newUser = true;
                    let input = {
                        email,
                        password: process.env.DEFAULT_GOOGLE_PASS
                    }
                    return User.create(input);
                }
            })
            .then(data => {
                let code = newUser ? 201 : 200;
                let token = generateToken({
                    id: data.id,
                    email: data.email
                })
                res.status(code).json({
                    token,
                    email: data.email
                });
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController;