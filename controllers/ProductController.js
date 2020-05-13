const { Product } = require('../models/index.js')

class ProductController {
    static findAll(req, res, next) {
        Product.findAll()
            .then(products => {
                res.status(200).json({ products })
            })
            .catch(err => next(err))
    }

    static create(req, res, next) {
        const { name, description, price, stock, expiry, image_url } = req.body;
        // console.log("@create", name);        
        
        Product.create({
            name, description, price, stock, expiry, image_url
        })
        .then(product => {
            res.status(201).json({
                product,
                msg: 'Product has been successfully added'
            })
        })
        .catch(err => {
            // console.log(err.original.table);            
            next(err)
        })
    }
}

module.exports = ProductController
