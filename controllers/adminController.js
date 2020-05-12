const { Administrator } = require('../models')
const { generate_password, compare_password } = require('../helpers/bcryptjs')
const { generate_token } = require('../helpers/jsonwebtoken')

class AdminController {
    static register(req, res, next) { 
        let { first_name, last_name, email, password } = req.body

        Administrator.create({ first_name, last_name, email, password })
            .then(new_admin => {
                if(new_admin) {
                    res
                      .status(201)
                      .json({ id: new_admin.id, email: new_admin.email })
                }
            })
            .catch(err => { next(err) })
    }

    static login(req, res, next) { 
        let { email, password } = req.body

        Administrator.findOne({ where: { email } })
            .then(admin => { 
                if(admin) {
                    let validation = compare_password(password, admin.password)

                    if (validation) {
                        let obj = { // jangan ngirim password
                            email: admin.email
                        }
                        let admin_token = generate_token(obj)
                        
                        res
                          .status(200)
                          .json({ admin_token })
                    }
                }
            })
            .catch(err => { next(err) })
    }
}

module.exports = AdminController