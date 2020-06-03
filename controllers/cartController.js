const { Cart, Product } = require('../models/index');

class CartController {
    // router.post('/', CartController.createCart);
    static createCart(req, res, next){
        res.status(201).json({
            msg: 'create cart'
        })
    }

    // router.get('/', CartController.readCart);
    static readCart(req, res, next){
        res.status(201).json({
            msg: 'read cart'
        })
    }

    // router.put('/:cartId', CartController.updateCart);
    static updateCart(req, res, next){
        res.status(201).json({
            msg: 'update cart'
        })
    }

    // router.delete('/:cartId', CartController.deleteCart);
    static deleteCart(req, res, next){
        res.status(201).json({
            msg: 'delete cart'
        })
    }

    // router.get('/history', CartController.readCartHistory);
    static readCartHistory(req, res, next){
        res.status(201).json({
            msg: 'cart history'
        })
    }
}

module.exports = CartController