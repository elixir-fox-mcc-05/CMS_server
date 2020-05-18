"use strict";
const {Category, Product} = require("../models");

class ControllerProduct {
    static findAll(req, res, next){
        Product
            .findAll({
                include : Category
            })
            .then(product => {
                res.status(200).json({
                    Product : product
                });
            })
            .catch(err => {
                return next(err);
            });
    }
    static findOne(req, res, next){
        Product
            .findByPk(req.params.id, {
                include : Category
            })
            .then(product => {
                res.status(200).json({
                    Product : product
                });
            })
            .catch(err => {
                return next(err);
            });
    }
    static create(req, res, next){
        const {name, image_url, price, stock, CategoryId} = req.body;
        let value;
        if(!CategoryId){
            value = {
                name,
                image_url,
                price,
                stock
            };
        } else {
            value = {
                name,
                image_url,
                price,
                stock,
                CategoryId
            };
        }
        Product
            .create(value)
            .then(product => {
                if(product){
                  return Product.findByPk(product.id, {
                    include: Category
                  })
                } else {
                    return next({
                        type : "Not Implemented",
                        code : 501,
                        msg : "Cannot Create Product"
                    });
                }
            })
            .then(product => {
              res.status(201).json({
                  Product : product
              });
            })
            .catch(err => {
              return next(err);
            });
    }
    static editData(req, res, next){
        const {id} = req.params;
        const {name, image_url, price, stock, CategoryId} = req.body;
        const value = {
            name,
            image_url,
            price,
            stock,
            CategoryId
        };
        Product
            .update(value, {
                where : {
                    id
                },
                include: Category
            })
            .then(product => {
                if(product){
                    return Product.findByPk(id);
                } else {
                    return next({
                        type : "Not Modified",
                        code : 304,
                        msg : "Cannot Update the data"
                    });
                }
            })
            .then(product => {
                res.status(202).json({
                    Product : product
                });
            })
            .catch(err => {
                return next(err);
            });
    }
    static deleteData(req, res, next){
        const {id} = req.params;
        Product
            .destroy({where : {id}})
            .then(()=> {
                res.status(202).json({
                    message : "Succes destroy product with id " + id
                });
            })
            .catch(err => {
                return next(err);
            });
    }
}

module.exports = ControllerProduct;