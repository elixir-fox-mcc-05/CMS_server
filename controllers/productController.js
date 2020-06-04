const {Product} = require('../models')

class ProductController{
    static addProduct(req, res, next){
        let {name, image_url, price, stock} = req.body
        let UserId = req.userid

        let newProduct = {
            name,
            image_url,
            price,
            stock,
            UserId
        }
        Product.create(newProduct)
            .then(data => {
                res.status(201).json({
                    product: data
                })
            })
            .catch(err => {
                next(err)
            })
    }

    // static findById(req, res, next){

    // }

    static readProduct(req, res, next){
        Product.findAll({
            order: [['id', 'ASC']]
        })
            .then(data => {
                res.status(200).json({
                    products: data
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static updateProduct(req, res, next){
        let {name, image_url, price, stock} = req.body
        let {id} = req.params
        let newUpdate = {
            name, 
            image_url,
            price,
            stock
        }
        Product.update(newUpdate, {
            where: {id},
            returning: true
        })
            .then(data => {
                if(data){
                    res.status(200).json({
                        product: data[1][0]
                    })
                } else {
                    throw{
                        code: 404,
                        message: `product not found`
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteProduct(req, res, next){
        let {id} = req.params
        Product.destroy({
            where: {id}
        })
            .then(data => {
                if(data){
                    res.status(200).json({
                        success: `success delete product with id ${id}`
                    })
                } else {
                    throw{
                        code: 404,
                        message: `data not found`
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ProductController