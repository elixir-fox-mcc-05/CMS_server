const { User } = require('../models')
const { compare_password } = require('../helpers/bcryptjs')
const { generate_token } = require('../helpers/jsonwebtoken')

class UserController {
    static register(req, res, next) { 
        let { first_name, last_name, email, password, role } = req.body

        User.create({ first_name, last_name, email, password, role })
            .then(new_user => {
                if(new_user) {
                    res
                      .status(201)
                      .json({ id: new_user.id, email: new_user.email })
                } else {
                    next(err)
                }
            })
            .catch(err => { next(err) })
    }

    static login(req, res, next) { 
        let { email, password } = req.body

        User.findOne({ where: { email } })
        .then(user => { 
            if (user == null) next (err)
                if(user) {
                    let validation = compare_password(password, user.password)

                    if (validation) {
                        let obj = { id: user.id, email: user.email }
                        let access_token = generate_token(obj)
                        let isAdmin = false
                        if ((user.role).toLowerCase() == 'admin') isAdmin = true

                        res
                          .status(200)
                          .json({ access_token, isAdmin })
                    } else {
                        next(err)
                    }
                }
            })
            .catch(err => { next(err) })
    }
}

module.exports = UserController