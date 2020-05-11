const { User } = require('../models');
const { compareHash } = require('../helpers/bcrypt.js');
const { generateToken } = require('../helpers/jwt.js');

class UserController {
    static register(req, res, next) {
        const { name, email, password } = req.body;

        User
            .create({
                name,
                email,
                password
            })
            .then(user => {
                res.status(201).json({
                    id: user.id,
                    email: user.email
                })
            })
            .catch(err => {
                next(err);
            })
    }

    static login(req, res, next) {
        const { email, password } = req.body;

        User
            .findOne({
                where: {
                    email
                }
            })
            .then(user => {
                if(user) {
                    let compare = compareHash(password, user.password);
                    if(compare) {
                        let payload = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                        };
                        let access_token = generateToken(payload);
                        res.status(200).json({
                            access_token
                        })
                    } else {
                        throw {
                            msg: 'invalid email/password',
                            code: 400
                        }    
                    }
                } else {
                    throw {
                        msg: 'invalid email/password',
                        code: 400
                    }
                }
            })
            .catch(err => {
                next(err);
            })
    }
}

module.exports = UserController;
