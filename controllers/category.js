const { Category } = require('../models');

class CategoryController {
    static addNewCategory(req, res, next) {
        console.log(req.body);
        const { name } = req.body;

        Category
            .create({
                name
            })
            .then(category => {
                res.status(201).json({
                    category
                })
            })
            .catch(err => {
                next(err);
            })
    }

    static showAllCategory(req, res, next) {
        const sort  = req.query.sort.split('|');
        const sortField = sort[0];
        const sortDirection = sort[1].toUpperCase();

        Category
            .findAll({
                order: [[sortField, sortDirection]]
            })
            .then(categories => {
                res.status(200).json({
                    categories
                })
            })
            .catch(err => {
                next(err);
            })
    }

    static updateCategory(req, res, next) {
        const { id } = req.params;
        const { name } =req.body;

        Category
            .update({
                name
            }, {
                where: {
                    id
                },
                returning: true
            })
            .then(category => {
                res.status(200).json({
                    category
                })
            })
            .catch(err => {
                next(err);
            })
    }

    static deleteCategory(req, res, next) {
        const { id } = req.params;

        Category
            .destroy({
                where: {
                    id
                }
            })
            .then(() => {
                res.status(200).json({
                    msg: `success delete category with id ${id}`
                })
            })
            .catch(err => {
                next(err);
            })
    }
}

module.exports = CategoryController;
