const { User } = require('../models')
const Helper = require('../helper/helper')

class Controller {
    static register(req, res, next) {
        const { name, email, password, role } = req.body
        const data = { name, email, password, role }
        // console.log(`masuk1`);

        User.create(data)
            .then(user => {
                // console.log(`masuk`);
                res.status(201).json({
                    name: user.name,
                    email: user.email,
                    role: user.role
                })
            })
            .catch(err => { next(err) })
    }

    static logIn(req, res, next) {
        const { email, password } = req.body

        User.findOne({ where: { email } })
            .then(user => {
                if (user) {
                    let compare = Helper.comparePassword(password, user.password)
                    if (compare) {
                        let access_token = Helper.generateToken({
                            id: user.id,
                            email: user.email
                        })
                        res.status(200).json({ access_token })
                    } else {
                        next({ message: 'Invalid Email/Password' })
                    }
                } else {
                    next({ message: 'Invalid Email/Password' })
                }
            })
            .catch(err => { next(err) })
    }
}

module.exports = Controller