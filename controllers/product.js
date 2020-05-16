const { User, Product, Category } = require('../models');
const { Op } = require("sequelize");

class ProductController {
    static addNewProduct(req, res, next) {
        const { name, image_url, price, stock } = req.body;
        const CategoryId = req.body.categoryId;
        const UserId = req.uid;

        Product
            .create({
                name,
                image_url,
                price,
                stock,
                UserId,
                CategoryId
            })
            .then(product => {
                res.status(201).json({
                    product
                })
            })
            .catch((err) => {
                next(err);
            });
    }

    static showAllProducts(req, res, next) {
        const { search } = req.query;
        const sort  = req.query.sort.split('|');
        const sortField = sort[0];
        const sortDirection = sort[1].toUpperCase();
        // const UserId = req.uid;

        Product
            .findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${search}%`
                    }
                },
                include: [Category],
                order: [[sortField, sortDirection]]
            })
            .then(products => {
                res.status(200).json({
                    products
                })
            })
            .catch((err) => {
                next(err);
            });
    }

    static updateProduct(req, res, next) {
        const { name, image_url, price, stock } = req.body;
        const CategoryId = req.body.categoryId;
        const { id } = req.params;
        
        Product
            .update({
                name,
                image_url,
                price,
                stock,
                CategoryId
            }, {
                where: {
                    id
                },
                returning: true
            })
            .then(product => {
                res.status(200).json({
                    product
                })
            })
            .catch((err) => {
                next(err);
            });
    }

    static deleteProduct(req, res, next) {
        const { id } = req.params;

        Product
            .destroy({
                where: {
                    id
                }
            })
            .then(() => {
                res.status(200).json({
                    msg:  `Success delete product with id ${id}`
                })
            })
            .catch((err) => {
                next(err);
            });
    }
}

module.exports = ProductController;
