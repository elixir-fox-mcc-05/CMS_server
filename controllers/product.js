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
        const { search, per_page, categoryId, page, stock } = req.query;
        const sort  = req.query.sort.split('|');
        const sortField = sort[0];
        const sortDirection = sort[1].toUpperCase();
        const whereClause = {
            name: {
                [Op.iLike]: `%${search}%`
            }
        }
        if (categoryId) {
            whereClause.CategoryId = categoryId;
        }

        if (stock) {
            whereClause.stock = {
                [Op.gt]: stock
            }
        }

        const startIndex = (page - 1) * per_page;
        const endIndex = page * per_page; 

        Product
            .findAndCountAll({
                where: whereClause,
                include: [Category],
                order: [[sortField, sortDirection]],
                offset: startIndex,
                limit: per_page
            })
            .then(results => {
                const lastPage = Math.ceil(results.count/per_page);
                res.status(200).json({
                    products: {
                        total: results.count,
                        per_page: +per_page,
                        current_page: +page,
                        last_page: lastPage,
                        from: startIndex+1,
                        to: endIndex,
                        data: results.rows
                    }
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
