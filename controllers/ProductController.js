const { Product } = require('../models/index.js')

class ProductController {
    static findAll(req, res, next) {
        Product.findAll()
            .then(products => {
                res.status(200).json({ products })
            })
            .catch(err => next(err))
    }
}

module.exports = ProductController
