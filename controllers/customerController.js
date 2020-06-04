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
        let customerId = req.currentUserId
        Customer.findByPk(customerId, {
            attributes: {exclude: ['password']}
        })
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
        let customerId = req.currentUserId
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
                        notif: 'Customer info successfully updated!'
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
        let customerId = req.currentUserId
        CartProduct.findAll({
            include: [Product, {
                model: Cart,
                where: {
                    CustomerId: customerId
                },
                include: [{
                    model: Customer,
                    attributes: {exclude: ['password']}
                }]
            }]
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
        let { CustomerId } = req.body
        Cart.create({
            CustomerId
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
        let { CartId } = req.params
        CartProduct.findAll({
            where: {
                CartId
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
        let { CartId } = req.params
        let { ProductId, quantity, status } = req.body
        CartProduct.create({
            quantity,
            status,
            CartId,
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
        let { CartId } = req.params
        let { id, ProductId, quantity, status } = req.body
        CartProduct.update({
            quantity,
            status,
            CartId,
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

    static updateCartStatus (req, res, next) {
        let { CartId } = req.params
        let { status } = req.body
        CartProduct.update({
            status
        }, {
            where: {
                CartId
            }
        })
            .then(data => {
                res.status(200).json({
                    data,
                    notif: 'Cart status successfully updated!'
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteProductFromCart (req, res, next) {
        let id = req.params.CartProductId
        CartProduct.destroy({
            where: {
                id
            }
        })
            .then(result => {
                if(result) {
                    res.status(200).json({
                        notif: 'Product successfully removed from cart!'
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