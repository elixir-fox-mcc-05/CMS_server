'use strict'

const { Category } = require(`../models`)

class CategoryController {

    static getAll( req, res){
        Category .findAll({
            order : [['name','asc']]
        })
                .then(result => {
                    res.status(201).json({
                        Category : result
                    })
                })
                .catch( err => {
                    res.status(500).json({
                        error : err.message
                    })
                })
    }

    static addCategory ( req, res) {
        const { name } = req.body
        Category.create({
            name
        })      .then( result => {
                    res.status(201).json({
                        id : result.id,
                        name : result.name
                    })
        })      .catch( err => {
                    res.status(500).json({
                        error : err.message
                    })
        })
    }

    static editCategory (req, res) {
        const { id, name } = req.body
        Category.update({
            name
        }, {
            where : {
                id : id
            }
        })      .then( result => {
                    res.status(202).json({
                        id : id,
                        name : name
                    })
        })      .catch( err => {
                    res.status(500).json({
                        error : err.message
                    })
        })
    }

    static removeCategory( req, res) {
        const { id } = req.body
        Category.destroy({
            where : {
                id : id
            }
        })      .then( result => {
            res.status(200).json({
                id : id,
                message : 'item deleted' 
            })
        })      .catch ( err => {
                res.status(500).json({
                    error : err.message
                })
        })
    }  
}

module.exports = CategoryController;