const { Product } = require('../models')
const { Op } = require('sequelize');

class ProductController {
    static addProduct (req, res, next) {
        const product = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category
        }
        Product.create(product)
        .then((result) => {
            return res.status(201).json({
                id: result.id,
                name: result.name,
                image_url: result.image_url,
                price: result.price,
                stock: result.stock,
                category: result.category
            })
        }).catch((err) => {
            return next(err)
        });
    }

    static deleteProduct (req, res, next) {
        Product.destroy({
            where: {
                id: req.params.id
            }
        })
        .then((result) => {
            if (result) {
                return res.status(200).json({
                    message: 'Data successfully deleted'
                })
            } else {
                return next({
                    name: 'NotFound',
                    errors: [{ message: 'Product Not Found' }]
                })
            }
        }).catch((err) => {
            return next(err)
        });
    }

    static updateProduct (req, res, next) {
        console.log(req.body)
        console.log(req.params.id, '<<<<<<<<<<')
        Product.update({
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category
        },{
            where: {
                id: req.params.id
            }
        })
        .then((result) => {
            console.log('sadbasidas <<<<<<<<<<<<<', result)
            if (result == 1) {
                return res.status(200).json({
                    message: 'Data successfully updated'
                })
            } else {
                return next({
                    name: 'BadRequest',
                    errors: [{ message: 'Request Error' }]
                })
            }
        }).catch((err) => {
            return next(err)
        });
    }
    static readProduct (req, res, next) {
        let src = {}
        if (req.query.category) {
            console.log(req.query.category)
            src = {
                where: {
                    category: {
                        [Op.iLike]: `%${req.query.category}%`
                    }
                }
            }
        }
        Product.findAll(src)
        .then((result) => {
            const products = result.map(el => {
                return {
                    id: el.id,
                    name: el.name,
                    image_url: el.image_url,
                    price: el.price,
                    stock: el.stock,
                    category: el.category                    
                }
            })
            return res.status(200).json({
                products
            })
        }).catch((err) => {
            return next(err)
        });
    }
}

module.exports = ProductController