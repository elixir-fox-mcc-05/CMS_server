const {Product, Category} = require('../models');

class ProductController {
    static findAll(req, res, next) {
        Product.findAll()
            .then(result => {
                res.status(200).json({Products: result});
            })
            .catch(err => {
                next(err);
            });
    }

    static findOne(req, res, next) {
        let {id} = req.params
        Product.findOne({
            where: {
                id
            }
        })
            .then(result => {
                if (result) {
                    res.status(200).json({Product: result});
                }
                else {
                    throw {
                        message: 'Product not found',
                        code: 404
                    };
                }
            })
            .catch(err => {
                next(err);
            });
    }

    static createProduct(req, res, next) {
        let {name, img_url, price, stock, CategoryId} = req.body;
        let UserId = req.UserId
        Product.create({
            name,
            img_url,
            price,
            stock,
            CategoryId,
            UserId
        })
            .then(result => {
                res.status(201).json({Product: result});
            })
            .catch(err => {
                next(err)
            })
    }

    static updateProduct(req, res, next) {
        let {id} = req.params;
        let {name, img_url, price, stock, CategoryId} = req.body;
        Product.update({
            name,
            img_url,
            price,
            stock,
            CategoryId
        }, {
            where: {
                id
            },
            returning: true
        })
            .then(result => {
                if (result) {
                    res.status(201).json({Product: result})
                }
                else {
                    throw {
                        message: 'Product not found',
                        code: 404
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteProduct(req, res, next) {
        let {id} = req.params;
        Product.destroy({
            where: {
                id
            }
        })
            .then(result => {
                if (result) {
                    res.status(200).json({message: `Product ${id} successfully deleted!`});
                }
                else {
                    throw {
                        message: 'Product not found',
                        code: 404
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ProductController;