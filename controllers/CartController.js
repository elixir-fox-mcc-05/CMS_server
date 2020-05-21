const { Cart, Product } = require('../models')
class CartController {
    static create (req, res, next) {
        const cart = {
            userId: req.currentuserId,
            productId: req.body.productId,
            qty: req.body.qty,
            total: req.body.total,
            status: req.body.status
        }
        Cart.create(cart)
        .then((result) => {
            return res.status(201).json({
                id: result.id,
                userId: result.userId,
                productId: result.productId,
                qty: result.qty,
                total: result.total,
                status: result.status
            })
        }).catch((err) => {
            return next(err)
        });
    }

    static read (req, res, next) {
        Cart.findAll({
            include: [{
                model: Product,
                required: true
            }],
            where: {
                userId: req.currentuserId
            }
        })
        .then((result) => {
            const carts = result.map(el => {
                return {
                    id: el.id,
                    userId: el.userId,
                    productId: el.productId,
                    qty: el.qty,
                    total: el.total,
                    status: el.status,
                    createdAt: el.createdAt,
                    name: el.Product.name
                }
            })
            res.status(200).json({
                carts
            })
        }).catch((err) => {
            return next(err)
        });
    }
    
}

module.exports = CartController