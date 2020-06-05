'use strict'

const {Cart, Product, User} = require('../models');

class CartController {
    static findAll (req, res, next) {
        const UserId = req.UserId;
        Cart.findAll({where: {UserId}, include: {model: Product, User}})
            .then(result => {
                res.status(200).json({Cart: result})
            })
            .catch(err => {
                next(err)
            })
    }

    static add(req, res, next) {
        const UserId = req.UserId;
        const {ProductId, quantity} = req.body;
        Cart.create({UserId, ProductId, quantity})
            .then(result => {
                res.status(201).json({Cart: result})
            })
            .catch(err => {
                next(err)
            })
    }

    static updateCart(req, res, next) {
        const UserId = req.UserId
        const {ProductId, quantity} = req.body;
        const {id} = req.params;
        let update = {ProductId, quantity, UserId}
        Cart.update(update, {where: {id}, returning: true})
            .then(result => {
                console.log(result[1])
                res.status(201).json({Cart: result[1]})
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteCart(req, res, next) {
        const UserId = req.UserId;
        const {id} = req.params;
        Cart.destroy({where: {id}})
            .then(result => {
                res.status(200).json({message: `Successfully delete cart`})
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = CartController;