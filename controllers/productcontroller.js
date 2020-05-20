'use strict'

const { Product, Category, User } = require(`../models`)
const { readToken } = require(`../helpers/jwt`)

class ProductController {

    static getAll( req, res){
        Product .findAll({
            include : [{ model : Category }]
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
    static getLimitedAll( req, res){
        Product .findAll({
            include : [{ model : Category },{ model : User }],
            order : [['updatedAt','asc'], ['stock','desc']],
            limit : Number[req.params.amount]
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
    static getAllbyCategory( req, res){
        Product .findAll({
            where : {
                CategoryId : Number(req.params.categoryid)
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

    static getOneMerchant( req, res){
        Product .findAll({
            include : [{ model : Category }],
            order : [['CategoryId','asc'],['name','asc']],
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
                    console.log(err.message)
                    res.status(500).json({
                        error : err.message
                    })
                })
    }

    static getOneProduct( req, res){
        Product .findOne({
            where : {
                id : Number(req.params.id),
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

    static addProduct ( req, res) {
        const { name, price, stock, CategoryId } = req.body
        const UserId = req.UserId
        Product.create({
            name,
            price : Number(price), 
            stock : Number(stock), 
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
                    console.log(err)
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
            console.log(err)
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