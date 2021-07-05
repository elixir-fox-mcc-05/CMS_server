const { Cart, Product } = require('../models/index');

class CartController {
    // router.post('/', CartController.createCart);
    static createCart(req, res, next){
        let { ProductId, quantity } = req.body
        let input = null
        let calculatePrice = null
        Product.findByPk(Number(ProductId))
            .then(data => {
                if(!data){
                    return next({
                        name: 'NotFound',
                        errors: [{
                            message: `Product with id ${ProductId} NOT FOUND`
                        }]
                    })
                }
                else {
                    calculatePrice = Number(data.price) * Number(quantity)
                    input = {
                        UserId: Number(req.currentUserId),
                        ProductId: Number(data.id),
                        quantity: Number(quantity),
                        totalPrice: calculatePrice
                    }
                    return Cart.create(input)
                        .then(data => {
                            return res.status(201).json({
                                cart: data
                            })
                        })
                }
            })
            .catch(err => {
                return next(err)
            })
    }

    // router.get('/', CartController.readCart);
    static readCart(req, res, next){
        let option = {
            where: {
                UserId: Number(req.currentUserId),
                isPaid: false
            },
            order: [[`createdAt`, 'ASC']],
            include: [{
                model: Product
            }]
        }
        Cart.findAll(option)
            .then(data => {
                return res.status(200).json({
                    carts: data
                })
            })
            .catch(err => {
                return next(err)
            })
    }

    // router.put('/:cartId', CartController.paymentCart);
    static paymentCart(req, res, next){
        let { cartId } = req.params
        let option = {
            where: {
                id: Number(cartId)
            },
            returning: true
        }
        let { isPaid } = req.body
        let input = null
        console.log(isPaid)
        if (isPaid === true){
            input = {
                isPaid
            }
            let productStock = null
            let productOption = null
            Cart.update(input, option)
                .then(data => {
                    productStock = {
                        stock: Number(data[1][0].quantity)
                    }
                    productOption = {
                        where: {
                            id: Number(data[1][0].ProductId)
                        }
                    }
                    Product.decrement(productStock, productOption)
                    return res.status(200).json({
                        cart: data[1][0],
                        message: 'Payment Success, thank you for shopping with us'
                    })
                })
                .catch(err => {
                    return next(err)
                })
        }
        else {
            if (isPaid === false){
                return next({
                    name: `BadRequest`,
                    errors: {
                        message: `please make the payment immedietly`
                    }
                })
            }
            else {
                return next({
                    name: `BadRequest`,
                    errors: {
                        message: `isPaid must be filled`
                    }
                })
            }
        }
    }

    // router.delete('/:cartId', CartController.deleteCart);
    static deleteCart(req, res, next){
        let { cartId } = req.params
        let option = {
            where: {
                id: Number(cartId),
            }
        }
        Cart.destroy(option)
            .then(data => {
                return res.status(200).json({
                    message: `Cart successfully deleted`
                })
            })
            .catch(err => {
                return next(err)
            })
    }

    // router.get('/history', CartController.readCartHistory);
    static readCartHistory(req, res, next){
        let option = {
            where: {
                UserId: Number(req.currentUserId),
                isPaid: true
            },
            order: [[`updatedAt`, 'DESC']],
            include: [{
                model: Product
            }]
        }
        Cart.findAll(option)
            .then(data => {
                return res.status(200).json({
                    carts: data
                })
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = CartController