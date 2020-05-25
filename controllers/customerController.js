const { Cart, CartProduct, Customer, Product, User } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class CustomerController {
    static registerCustomer (req, res, next) {
        let {name, address, email, phone, password} = req.body
        Customer.create({
            name,
            address,
            email,
            phone,
            password
        })
            .then(data => {
                res.status(201).json({
                    data: {
                        id: data.id,
                        name: data.name,
                        address: data.address,
                        email: data.email,
                        phone: data.phone
                    },
                    notif: 'Register successful!'
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static loginCustomer (req, res, next) {
        let {email, password} = req.body
        Customer.findOne({
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

    static getCustomerDetail (req, res, next) {
        let { customerId } = req.params
        Customer.findByPk(customerId)
            .then(data => {
                if(data) {
                    res.status(200).json({
                        data
                    })
                } else {
                    throw {
                        msg: "Customer not found",
                        code: 404
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static updateCustomerDetail (req, res, next) {
        let { customerId } = req.params
        let { name, address, email, phone } = req.body
        Customer.update({
            name,
            address,
            email,
            phone
        }, {
            where: {
                id: customerId
            }
        })
            .then(result => {
                if(result[0] == 1 ) {
                    res.status(200).json({
                        notif: 'Customer successfully updated!'
                    })
                } else {
                    throw {
                        msg: "Customer not found",
                        code: 404
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }
    
    static findAllCustomerCart (req, res, next) {
        let { customerId } = req.params
        CustomerCart.findAll({
            order: [
                ['id', 'ASC']
            ],
            where: {
                id: customerId
            }
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

    static createCart (req, res, next) {
        let { customerId } = req.params
        Cart.create({
            CustomerId: customerId
        })
            .then(data => {
                res.status(201).json({
                    data,
                    notif: 'Cart successfully created!'
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static findCartById (req, res, next) {
        let { cartId } = req.params
        CustomerCart.findAll({
            where: {
                CartId: cartId
            }
        })
            .then(data => {
                if(data) {
                    res.status(200).json({
                        data
                    })
                } else {
                    throw {
                        msg: "Cart not found",
                        code: 404
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static addProductToCart (req, res, next) {
        let { cartId } = req.params
        let { ProductId, quantity, status } = req,body
        CartProduct.create({
            quantity,
            status,
            CartId: cartId,
            ProductId
        })
            .then(data => {
                res.status(201).json({
                    data,
                    notif: 'Product successfully added to Cart!'
                })
            })
            .catch(err => {
                next(err)
            })

    }
    static updateCartProduct (req, res, next) {
        let { cartId } = req.params
        let { id, ProductId, quantity, status } = req,body
        CartProduct.update({
            quantity,
            status,
            CartId: cartId,
            ProductId
        }, {
            where: {
                id
            }
        })
            .then(data => {
                res.status(200).json({
                    data,
                    notif: 'Cart successfully updated!'
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteCart (req, res, next) {
        let { cartId } = req.params
        CartProduct.destroy({
            where: {
                CartId: cartId
            }
        })
            .then(result => {
                if(result) {
                    res.status(200).json({
                        notif: 'Cart successfully removed!'
                    })
                } else {
                    throw {
                        msg: "Cart not found",
                        code: 404
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = CustomerController