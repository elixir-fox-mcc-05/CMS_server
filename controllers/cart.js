const { Cart, ProductCart, Product } = require('../models');

class CartController {
    static addProduct(req, res, next) {
        const { id } = req.cartId;
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
        const { CartId } = req.cartId;

        ProductCart
            .findAll({
                where: {
                    CartId
                },
                include: [Cart, Product]
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

    }

    static deleteProduct(req, res, next) {

    }
}

module.exports = CartController;
