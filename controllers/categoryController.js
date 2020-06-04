'use strict'

const {Category, Product} = require('../models')

class CategoryController {
    static findAll (req, res, next) {
        Category.findAll({include: Product})
            .then(result => {
                res.status(200).json({Category: result})
            })
            .catch(err => {
                next(err)
            })
    }

    static create(req, res, next) {
        const {name} = req.body
        Category.create({name})
            .then(result => {
                res.status(201).json({result})
            })
            .catch(err => {
                next(err)
            })
    }

    static update(req, res, next) {
        const {name} = req.body;
        const {id} = req.params;
        Category.update({name}, {where: {id}, returning: true})
            .then(result => {
                res.status(201).json({result})
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = CategoryController;