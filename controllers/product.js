const { Product } = require('../models')

class ProductController {
    static findAll(req, res, next){
        Product.findAll({
            order: [['id', 'DESC']]
        })
        .then(result => {
            return res.status(200).json({
                result
            })
        })
        .catch(err => {
            return next(err)
        })
    }

    static findOne(req, res, next){
        const id = req.params.id
        Product.findOne({
            where: {
                id
            }
        })
        .then(result => {
            if(result) {
                return res.status(200).json({
                    result
                })
            }
            else {
                return next({
                    name : 'Not Found',
                    errors: [{message: "Product not found"}]
                })
            }
        })
        .catch(err => {
            return next(err)
        })
    }

    static create(req, res, next){
        const newProduct ={
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category
        }
        Product.create(newProduct)
        .then(result=> {
            return res.status(201).json({
                msg: "New Product Successfully added",
                product: result
            })
        })
        .catch(err => {
            return next(err)
        })  
    }

    static update(req, res, next){
        const id = +req.params.id
        const updateData = {
            name : req.body.name,
            image_url : req.body.image_url,
            price : req.body.price,
            stock : req.body.stock,
            category: req.body.category
        }
        Product.update(updateData, {
            where : {id},
            returning : true
        }, )
        .then(updatedData => {
            return  res.status(200).json({
                msg: "Product Successfully Updated",
                product: updatedData[1][0] 
            })
        })
        .catch(err => {
            return next(err)
        }) 
    }

    static delete(req, res, next){
        Product.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            return res.status(200).json({
                msg: "Product successfully deleted"
            })
            
        })
        .catch(err => {
            return next(err)
        }) 
    }
}

module.exports = ProductController