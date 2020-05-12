const { Product } = require('../models')

class ProductController {
    static findAll(req, res, next) { 
        Product.findAll()
            .then(products => {
                if (products) {
                    res
                      .status(200)
                      .json({ products })
                }
            })
    }
    
    static findOne(req, res, next) { 
        const { productId } = req.params

        Product.findByPk(productId)
            .then(product => {
                if (product) {
                    res
                      .status(200)
                      .json({ product })
                }
            })
    }
    
    static create(req, res, next) { 
        const { name, image_url, price, stock, category } = req.body

        Product.create({ name, image_url, price, stock, category })
            .then(new_product => {
                if(new_product) {
                    res
                      .status(201)
                      .json({ new_product })
                }
            })
    }
    
    static update(req, res, next) { 
        const { name, image_url, price, stock, category } = req.body
        const { productId } = req.params

        Product.update({ name, image_url, price, stock, category }, { where: { id: productId } })
            .then(update_product => {
                if(update_product) {
                    res
                      .status(204)
                      .json({ update_product }) // check it
                }
            })
    }
    
    static delete(req, res, next) { 
        const { productId } = req.params

        Product.destroy({where: { id: productId }})
            .then(deleted => {
                if (deleted) {
                    res
                      .status(204)
                      .json({ deleted })
                }
            })
    }
}

module.exports = ProductController