const { User, Product } = require('../models');

class ProductController {
    static addNewProduct(req, res, next) {
        const { name, image_url, price, stock } = req.body;
        const UserId = req.uid;

        Product
            .create({
                name,
                image_url,
                price,
                stock,
                UserId
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
        const UserId = req.uid

        Product
            .findAll({
                where: {
                    UserId
                }
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
        const { id } = req.params;
        
        Product
            .update({
                name,
                image_url,
                price,
                stock
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
