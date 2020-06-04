const {Cart, Product} = require('../models')

class CartController{
    static addCart(req, res, next){
        let {ProductId} = req.body
        let UserId = req.userid
        let total_price 
        let result
        Product.findOne({
            where: {id: ProductId}
        })
            .then(data => {
                total_price = data.price
                return Cart.create({UserId, ProductId, total_price})
            })
            .then(data => {
                result = data
                return Product.decrement('stock', {by: 1, where: {id: ProductId}})
            })
            .then(data => {
                res.status(201).json({
                    cart: result
                })
            })
            .catch(err => {
                next(err)
            })
    }
    static getCart(req, res, next){
        let UserId = req.userid
        Cart.findAll({
            where: {
                UserId
            },
            include: {
                model: Product
            }
        })
            .then(data => {
                res.status(200).json({
                    cart: data
                })
            })
            .catch(err => {
                next(err)
            })
    }
    static checkout(req, res, next) {
        let UserId = req.userid
        Cart.destroy({
            where: {
                UserId
            }
        })
            .then(data => {
                res.status(200).json({
                    message: `success checkout`
                })
            })
            .catch(err => {
                console.log('error')
                next(err)
            })
    }

}

module.exports = CartController