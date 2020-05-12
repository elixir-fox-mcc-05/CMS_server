'use strict'

const { Product, ProductPicture } = require(`../models`)
const { readToken } = require(`../helpers/jwt`)

class ProductController {

    static getAll( req, res){
        Product .findAll({})
                .then(result => {
                    res.status(201).json({
                        result
                    })
                })
                .catch( err => {
                    res.status(500).json({
                        error : err.message
                    })
                })
    }

    static addProduct ( req, res) {
        const { name, price, stock, CategoryId } = req.body
        const UserId = req.UserId
        Product.create({
            name,
            price, 
            stock, 
            CategoryId,
            UserId
        })      .then( result => {
                    res.status(201).json({
                        id : result.id,
                        name : result.name,
                        price : result.price,
                        stock : result.stock,
                        CategoryId : result.CategoryId,
                        UserId : result.UserId
                    })
        })      .catch( err => {
                    res.status(500).json({
                        error : err.message
                    })
        })
    }

    static editProduct (req, res) {
        const { id, name, price, stock, CategoryId } = req.body
        Product.update({
            name,
            price, 
            stock, 
            CategoryId
        }, {
            where : {
                id : id,
                UserId : req.UserId
            }
        })      .then( result => {
                    res.status(202).json({
                        id : id,
                        name : name,
                        price : price,
                        stock : stock,
                        CategoryId : CategoryId
                    })
        })      .catch( err => {
            console.log(err.message)
                    res.status(500).json({
                        error : err.message
                    })
        })
    }

    static removeProduct( req, res) {
        const { id } = req.body
        Product.destroy({
            where : {
                id : id
            }
        })  .then( _=> {
            res.status(200).json({
                message : `Item deleted`
            })
        })  .catch( err => {
            res.status(500).json({
                error : err.message
            })
        })
    }
}

module.exports = ProductController;