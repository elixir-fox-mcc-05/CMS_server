const { User } = require('../models/index.js')
const { verifyPassword } = require('../helpers/bcrypt.js')
const { generateToken } = require('../helpers/jwt.js')

class UserController {
    static register (req, res, next) {
        let { name, email, password, role } = req.body;
        User.create({
            name,
            email,
            password,
            role
        })
        .then(user => {
            // console.log(user)
            const { id, name, email, role } = user
            let msg = 'You have been successfully registered!'
            if (role === 'admin') msg = 'Your admin account is ready!'

            res.status(201).json({
                id,
                name,
                email,
                role,
                msg
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static login (req, res, next) {
        // console.log('@login is called');
        let { email, password } = req.body
        User.findOne({
            where: { email }
        })
        .then(user => {
            if (user) {
                // console.log(user);
                let { id, name, email, role } = user
                let msg = 'Successful login. Welcome back!'
                let hash = user.password

                if (verifyPassword(password, hash)) {
                    let access_token = generateToken({
                        id,
                        name,
                        email,
                        role
                    })
                    res.status(200).json({ 
                        access_token,
                        msg
                    })
                } else {
                    throw {
                        msg: "Wrong email/password",
                        code: 400
                    }
                }
            } else {
                throw {
                    msg: "Looks like you have not registered",
                    code: 400
                }
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UserController
