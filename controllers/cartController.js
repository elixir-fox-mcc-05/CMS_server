const { User, Product, Cart } = require('../models')

class CartController {
    static findAll(req, res, next) {
        const { UserId }= req

        Cart.findAll({ where: { UserId }, include: [ User, Product ] })
            .then(carts => {
                if (carts) {
                    res
                      .status(200)
                      .json({ carts })
                } else {
                    next(err)
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static create(req, res, next) { 
        let { UserId } = req
        let { ProductId, quantity } = req.body

        Cart.findAll({ where: { ProductId, UserId } })
            .then(existProduct => {
                if (existProduct.length > 0) {
                    Cart.update({ quantity: (existProduct[0].dataValues.quantity += +quantity) }, { where: { id: existProduct[0].dataValues.id } })
                                .then(updated => {
                                        if (updated) {
                                            res
                                            .status(200)
                                            .json({ updated })
                                        } else {
                                            next(err)
                                        }
                                    })
                                    .catch(err => {
                                        next (err)
                                    })
                } else {
                    Cart.create({ UserId, ProductId, quantity })
                    .then(new_cart => {
                        if (new_cart) {
                            res
                              .status(201)
                              .json({ new_cart })
                        } else {
                            next (err)
                        }
                    })
                    .catch(err => next(err))
                }
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    static delete(req, res, next) { 
        const { CartId } = req.params

        Cart.destroy({ where: { id: CartId } })
        .then(deleted => {
            if (deleted) {
                res
                  .status(204)
                  .json({ deleted })
            } else {
                next (err)
            }
        })
        .catch(err => next(err))
    }
}

module.exports = CartController