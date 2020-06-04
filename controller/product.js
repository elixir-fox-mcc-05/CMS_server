const Model = require('../models')
const Product = Model.Product
const Category = Model.Category


class ProductController {
    static findAll (req, res, next){

        Product.findAll({include: {model: Category}})
            .then(result => {
                res.status(200).json({ products : result })
            })
            .catch(err => {
                return next(err)
            })
    }

    static findById(req, res, next) {
        let {id} = req.params
        Product.findOne({ where : { id } })
            .then(result => {
                if(result){
                    res.status(200).json({ products : result })
                }else{
                    throw {
                        message : 'Product not found',
                        code : 404
                    }
                }
            })
            .catch(err => {
                return next(err)
            })
    }

    static createProduct(req, res, next) {
        let UserId = req.UserId
        let { name, price, stock, imageUrl, CategoryId } = req.body

        Product.create({ name, price, stock, imageUrl, UserId, CategoryId})
            .then(result => {
                res.status(201).json({ products : result })
            })
            .catch(err => {
                // console.log(err)
                return next(err)
            })
    }

    static updateProduct(req, res, next) {
        let { name, price, stock, imageUrl, CategoryId } = req.body
        let { id } = req.params
        let updated = {
            name, price, stock, imageUrl, CategoryId
        }

        Product.update( updated, { where : { id }, returning : true })  
            .then(result => {
                if(result) {
                    // console.log(result)
                    res.status(201).json({ products : result })
                }else{
                    throw {
                        message : "Product not Found!",
                        code : 404
                    }
                }
            })
            .catch(err => {
                return next(err)
            })
    }

    static deleteProduct (req, res, next) {
        let { id } = req.params
        Product.destroy({where : {id}})
            .then(data => {
                if(data){
                    res.status(200).json({ message : `Product ${id} successfully deleted!` })
                }else{
                    throw {
                        message : "Product cannot Found!",
                        code : 404
                    }
                }
            })
            .catch(err => {
                return next(err)
            })

    }
}

module.exports = ProductController;