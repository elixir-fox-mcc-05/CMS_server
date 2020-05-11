let { Product, User } = require('../models/index')

class ProductController {

    static findAllProduct(req, res, next) {
        Product.findAll()
            .then(data => {
                res.status(200).json({
                    data
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static createProduct(req, res, next) {
        let { name, description, image_url, price, stock, category } = req.body
        Product.create({
            name,
            description,
            image_url,
            price,
            stock,
            category
        })
            .then(data => {
                res.status(201).json({
                    data,
                    notif: 'Product successfully created!'
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static findProductById(req, res, next) {
        let { id } = req.params
        Product.findByPk(id)
            .then(data => {
                if(data) {
                    res.status(200).json({
                        data
                    })
                } else {
                    throw {
                        msg: "Product not found",
                        code: 404
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static updateProduct(req, res, next) {
        let {id} = req.params
        let { name, description, image_url, price, stock, category} = req.body
        Product.update({
            name,
            description,
            image_url,
            price,
            stock,
            category
        }, {
            where: {
                id
            }
        })
            .then(data => {
                res.status(200).json({
                    data,
                    notif: 'Product successfully updated!'
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteProduct(req, res, next) {
        let {id} = req.params
        Product.destroy({
            where: {
                id
            }
        })
            .then(() => {
                res.status(200).json({
                    notif: 'Product successfully removed!'
                })
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = ProductController