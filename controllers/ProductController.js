const { Product } = require('../models/index.js')

class ProductController {
    static findAll(req, res, next) {
        Product.findAll()
            .then(products => {
                res.status(200).json({ products })
            })
            .catch(err => next(err))
    }

    static findOne(req, res, next) {
        let { id } = req.params
        Product.findByPk(id)
            .then(product => {
                if (product) res.status(200).json({ product })
                else next(`Product with id ${id} is not available`)
            })
            .catch(err => next(err))
    }

    static create(req, res, next) {
        const { name, description, price, stock, expiry, image_url, category } = req.body;
        // console.log("@create", name);        
        
        Product.create({
            name, description, price, stock, expiry, image_url, category
        })
        .then(product => {
            // console.log(product)
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

    static update(req, res, next) {
        let { name, description, price, stock, category, expiry, image_url } = req.body
        const { id } = req.params
        let updated = {}
        Product.findByPk(id)
            .then(result => {
                if (!result) next(`Product with id ${id} is not available`)
                updated.name = (name) ? name : result.name;
                updated.description = (description) ? description : result.description;
                updated.price = (price) ? price : result.price;
                updated.stock = (stock) ? stock : result.stock;
                updated.category = (category) ? category : result.category;
                updated.expiry = (expiry) ? expiry : result.expiry;
                updated.image_url = (image_url) ? image_url : result.image_url;
                // console.log(updated);

                result.update(updated, {
                    where: { id },
                    returning: true
                })
                .then(edited => {
                    // console.log(edited);
                    res.status(200).json({
                        product: edited,
                        msg: `Product ${edited.name} has been successfully updated`
                    })
                })
                .catch(err => { next(err) })
            })
            .catch(err => {
                next(err)
            })

        
            

    }
}

module.exports = ProductController
