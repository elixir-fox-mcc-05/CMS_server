"use strict"

const Model = require("../models/index.js");

const Product = Model.Product;

class ControllerProduct{
    static showProduct(req, res, next){
        const UserId = req.currentUserId;
        
        Product
            .findAll({
                where: {
                    UserId
                }
            })
            .then(products => {
                res.status(200).json({products});
            })
            .catch(err => {
                return next({
                    name: "InternalServerError",
                    errors: [{message: err}]
                });
            })
    }
    static addProduct(req, res, next){
        const {name, image_url, price, stock} = req.body;
        const UserId = req.currentUserId
        
        Product
            .create({
                name,
                image_url,
                price,
                stock,
                UserId
            })
            .then(result => {
                res.status(201).json({
                    product: result
                });
            })
            .catch(err => {
                return next({
                    name: "InternalServerError",
                    errors: [{message: err}]
                });
            })
    }
    static findProduct(req, res, next){
        const {id} = req.params;
        
        Product
            .findOne({
                where: {
                id
                }
            })
            .then(product => {
                res.status(200).json({product});
            })
            .catch(err => {
                return next({
                    name: "InternalServerError",
                    errors: [{message: err}]
                });
            })
    }
    static deleteProduct(req, res, next){
        const {id} = req.params;

        Product
            .destroy({
                where: {
                id
                }
            })
            .then(product => {
                res.status(200).json({
                    msg: "product deleted",
                    product
                });
            })
            .catch(err => {
                return next({
                    name: "InternalServerError",
                    errors: [{message: err}]
                });
            })
    }
    static updateProduct(req, res, next){
        const {id} = req.params;
        const updatedProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        Product
            .update(updatedProduct, 
            {
                where: {
                id
                },
                returning: true
            })
            .then(result => {
                res.status(201).json({
                    msg: "product updated",
                    product: result
                });
            })
            .catch(err => {
                return next({
                    name: "InternalServerError",
                    errors: [{message: err}]
                });
            })
    }
}

module.exports = ControllerProduct;