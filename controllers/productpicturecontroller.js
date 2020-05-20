'use strict'

const { Product, Category, ProductPicture } = require(`../models`)
const { readToken } = require(`../helpers/jwt`)

class ProductController {

    static getAll( req, res){
        ProductPicture .findAll({})
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
    static getAllbyMerchant( req, res){
        ProductPicture .findAll({
            where : {
                UserId : req.UserId
            }
        })
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
    static getAllbyProductId( req, res){
        ProductPicture .findAll({
            where : {
                ProductId : Number(req.params.productid),
                UserId : req.UserId
            }
        })
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

    static getOnePicture( req, res){
        ProductPicture .findOne({
            where : {
                id : Number(req.params.id),
            }
        })
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

    static addPicture ( req, res) {
        const { filename, ProductId } = req.body
        ProductPicture.create({
            filename,
            UserId : req.UserId,
            ProductId
        })      .then( result => {
                    res.status(201).json({
                        id : result.id,
                        filename : result.filename,
                        UserId : result.UserId,
                        ProductId : result.ProductId
                    })
        })      .catch( err => {
                    console.log(err)
                    res.status(500).json({
                        error : err.message
                    })
        })
    }

    static removePicture( req, res) {
        const { id } = req.body
        ProductPicture.destroy({
            where : {
                id : id
            }
        })  .then( (result)=> {
            if(result) {
                res.status(200).json({
                    message : `Item deleted`
                })
            } else {
                res.status(404).json({
                    message : `Item not found`
                })
            }
        })  .catch( err => {
            res.status(500).json({
                error : err.message
            })
        })
    }
}

module.exports = ProductController;