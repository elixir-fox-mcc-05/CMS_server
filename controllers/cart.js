const { Cart, ProductCart, Product } = require('../models');

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
                res.status(200).json({
                    cart
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
