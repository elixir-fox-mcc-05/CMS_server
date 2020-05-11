const { User } = require('../models');
const { compare }  = require('../helpers/bcrypt.js');
const { generateToken } = require('../helpers/jwt.js');

class UserController {
    static login(req, res, next) {
        let { email, password } = req.body;

        User
            .findOne({ where: { email }})
                .then(user => {
                    if(user) {
                        if(compare(password, user.password)) {
                            const token = generateToken({ id: user.id, email: user.email });
                            res.status(200).json({ Token: token })
                        } else {
                            next({
                                name: 'Bad Request',
                                errors: 'Email or password is wrong'
                            })
                        }
                    } else {
                        next({
                            name: 'Bad Request',
                            errors: 'Email or password is wrong'
                        })
                    }
                })
                .catch(err => {
                    res.status(500).json({ Error: err.message })
                })
    }
}

module.exports = UserController;