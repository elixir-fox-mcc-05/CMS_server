let { Category } = require('../models')


class CategoryCon {
    static show (req,res) {
        Category.findAll()
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            res.status(500).json({
                msg : 'failed to get category list',
                err
            })
        })
    }
    static add (req,res) {
        let name = req.body.name
        if(!name) {
            res.status(400).json({
                msg : 'please input category name'
            })
        } else {
            Category.create({
                name,
            })
            .then(result=>{
                res.status(201).json({
                    msg : 'Category Created',
                    result,
                })
            })
            .catch(err=>{
                res.status(500).json({
                    msg : 'failed createing category , internal server error',
                    err
                })
            });
        };
    }
    static update (req,res) {
        Category.update({
            name : req.body.name
        }, {
            where : {
                id : req.params.id
            }
        })
        .then(result=>{
            if(result==0){
                res.status(400).json({
                    msg : "Category id doesn't exists or has been deleted"
                })
            } else {
                res.status(201).json({
                    msg : 'Category updated'
                })
            }
        })
        .catch(err=>{
            res.status(500).json({
                msg : "failed updating category , internal server error",
                err
            })
        })
    }
    static delete(req,res) {
        Category.destroy({
            where : {
                id : req.params.id
            }
        })
        .then(result=>{
            if(result==0){
                res.status(400).json({
                    msg : "Category id doesn't exists or has been deleted"
                })
            } else {
                res.status(201).json({
                    msg : 'Category Deleted'
                })
            }
        })
        .catch(err=>{
            res.status(500).json({
                msg : "failed Deleting category , internal server error",
                err
            })
        })
    }


}

module.exports = CategoryCon