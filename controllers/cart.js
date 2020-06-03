const { Cart, ProductCart, Product, sequelize } = require('../models');

class CartController {
    static addProduct(req, res, next) {
        const id = req.cartId;
        const { productId, quantity } = req.body;

        ProductCart
            .create({
                CartId: id,
                ProductId: productId,
                quantity
            })
            .then(cartProduct => {
                return ProductCart
                    .findOne({
                        where: {
                            id: cartProduct.id
                        },
                        include: [Product]
                    })
            })
            .then(product => {
                res.status(201).json({
                    product
                })
            })
            .catch(err => {
                next(err);
            })
    }

    static showCart(req, res, next) {
        const cartId = req.cartId;

        Cart
            .findOne({
                where: {
                    id: cartId
                },
                include: [Product]
            })
            .then(cart => {
                const unpaid = cart.Products.filter(product => {
                    return !product.ProductCart.paidStatus
                })
                res.status(200).json({
                    cart: {
                        id: cart.id,
                        CustomerId: cart.CustomerId,
                        total_price: cart.total_price,
                        Products: unpaid
                    }
                })
            })
            .catch(err => {
                next(err);
            })
    }

    static getTransactionHistory(req, res, next) {
        const CartId = req.cartId;

        ProductCart
            .findAll({
                where: {
                    CartId,
                    paidStatus: true
                },
                attributes: {
                    include: ['updatedAt']
                },
                include: [Product],
                order: [['updatedAt', 'DESC']]
            })
            .then(products => {
                res.status(200).json({
                    products
                })
            })
            .catch(err => {
                next(err);
            })
    }

    static changeQuantity(req, res, next) {
        const { quantity } = req.body;
        const { id } = req.params;
        const cartId = req.cartId;

        ProductCart
            .update({
                quantity
            },{
                where: {
                    ProductId: id,
                    CartId: cartId
                },
                returning: true
            })
            .then(result => {
                res.status(200).json({
                    cartProduct: result[1]
                })
            })
            .catch(err => {
                next(err);
            })
    }

    static checkOut(req, res, next) {
        const CartId = req.cartId;
        const checkOut = [];

        ProductCart
            .findAll({
                where: {
                    CartId,
                    paidStatus: false
                }
            })
            .then(product => {
                product.forEach(prod => {
                    checkOut.push(
                        ProductCart
                            .update({
                                paidStatus: true
                            },{
                                where: {
                                    CartId: prod.CartId,
                                    ProductId: prod.ProductId
                                }
                            })
                    )
                })
                return Promise.all(checkOut)
            })
            .then(() => {
                res.status(200).json({
                    msg: 'Checkout Success'
                })
            })
            .catch(err => {
                next(err);
            })
    }

    static removeProduct(req, res, next) {
        const { id } = req.params;
        const cartId = req.cartId;

        ProductCart
            .destroy({
                where: {
                    ProductId: id,
                    CartId: cartId
                }
            })
            .then(() => {
                res.status(200).json({
                    msg: `Success remove product with id ${id} from your cart`
                })
            })
            .catch(err => {
                next(err);
            })
    }
}

module.exports = CartController;
