const { Cart, ProductCart, Product } = require('../models');

class CartController {
    static addProduct(req, res, next) {
        const id = req.cartId;
        console.log(req.cartId);
        const { productId, quantity } = req.body;

        ProductCart
            .create({
                CartId: id,
                ProductId: productId,
                quantity
            })
            .then(cartProduct => {
                return Product
                    .findByPk(cartProduct.ProductId)
            })
            .then(product => {
                res.status(201).json({
                    msg: `success add ${product.name} to your cart`
                })
            })
            .catch(err => {
                next(err);
            })
    }

    static showCart(req, res, next) {
        const CartId = req.cartId;

        Cart
            .findAll({
                where: {
                    id: CartId
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
        console.log(quantity);

        ProductCart
            .update({
                quantity
            },{
                where: {
                    id
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

        ProductCart
            .destroy({
                where: {
                    id
                }
            })
            .then(() => {
                res.status(200).json({
                    msg: `Success remove product from cart`
                })
            })
            .catch(err => {
                next(err);
            })
    }
}

module.exports = CartController;
