const { Customer } = require('../models');
const { compareHash } = require('../helpers/bcrypt.js');
const { generateToken } = require('../helpers/jwt.js');

class CustomerController {
    static register(req, res, next) {
        const { name, email, password } = req.body;

        Customer
            .create({
                name,
                email,
                password
            })
            .then(customer => {
                res.status(201).json({
                    id: customer.id,
                    name: customer.name,
                    email: customer.email
                })
            })
            .catch(err => {
                next(err);
            })
    }

    static login(req, res, next) {
        const { email, password } = req.body;

        Customer
            .findOne({
                where: {
                    email
                }
            })
            .then(customer => {
                if(customer) {
                    const compare = compareHash(password, customer.password);
                    if(compare) {
                        const payload = {
                            id: customer.id,
                            name: customer.name,
                            email: customer.email
                        }
                        const access_token = generateToken(payload);
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

module.exports = CustomerController;
