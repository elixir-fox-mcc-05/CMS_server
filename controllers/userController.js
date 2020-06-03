const { User, CartProduct, Cart, Product, Customer } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
    static register (req, res, next) {
        let {name, role, email, password} = req.body
        User.create({
            name,
            role,
            email,
            password,
        })
            .then(data => {
                res.status(201).json({
                    data: {
                        id: data.id,
                        name: data.name,
                        role: data.role,
                        email: data.email
                    },
                    notif: 'Register successful!'
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static login (req, res, next) {
        let {email, password} = req.body
        User.findOne({
            where: {
                email
            }
        })
            .then(data => {
                if(data) {
                    let compare = comparePassword(password, data.password)
                    if(compare) {
                        let token = generateToken({
                            id: data.id,
                            name: data.name,
                            email: data.email
                        })
                        res.status(200).json({
                            token,
                            data: {
                                id: data.id,
                                name: data.name,
                                email: data.email    
                            },
                            notif: `Welcome Back ${data.name}!`
                        })        
                    } else {
                        throw {
                            msg: 'Please input correct password',
                            code: 401
                        }    
                    }
                } else {
                    throw {
                        msg: 'Please input registered email',
                        code: 401
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static getAllOrder (req, res, next) {
        CartProduct.findAll({
            include: [Product, {
                model: Cart,
                include: [{
                    model: Customer,
                    attributes: {exclude: ['password']}
                }]
            }],
            order: [
                ['createdAt', 'ASC'],
            ],
        })
            .then(data => {
                res.status(200).json({
                    data
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static updateOrder (req, res, next) {
        let { status, id } = req.body
        CartProduct.update({
            status
        }, {
            where: {
                id
            }
        })
            .then(data => {
                res.status(200).json({
                    data,
                    notif: 'Order status successfully updated!'
                })
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = UserController