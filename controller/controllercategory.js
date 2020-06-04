"use strict";
const {Category, Product} = require('../models');

class ControllerCategory {
    static findAll(req, res, next){
        Category
            .findAll({
                include : Product
            })
            .then(category => {
                res.status(200).json({
                    Category : category
                });
            })
            .then(err => {
                return next(err);
            });
    }
    static findOne(req, res, next){
        Category
            .findByPk(req.params.id, {
                include : Product
            })
            .then(category => {
                res.status(200).json({
                    Category : category
                });
            })
            .catch(err => {
                return next(err);
            });
    }
    static create(req, res, next){
        const {name} = req.body;
        const value = {name};
        Category
            .create(value, {
              include: Product
            })
            .then(category => {
                res.status(201).json({
                    Category : category
                });
            })
            .catch(err => {
                return next(err);
            });
    }
    static editData(req, res, next){
        const {id} = req.params;
        const {name} = req.body;
        const value = {name};
        Category
            .update(value, {
                where : {
                    id
                }
            })
            .then(category => {
                return Category.findByPk(id, {
                  include: Product
                });
            })
            .then(category => {
                res.status(202).json({
                    Category : category
                });
            })
            .catch(err => {
                return next(err);
            });
    }
    static deleteData(req, res, next){
        const {id} = req.params;
        Category
            .destroy({where : {id}})
            .then(()=> {
                res.status(202).json({
                    message : `Succes destroy category with id ${id}`
                });
            })
            .catch(err => {
                return next(err);
            });
    }
}

module.exports = ControllerCategory;