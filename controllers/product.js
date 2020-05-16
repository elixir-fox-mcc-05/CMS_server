let { Product } = require('../models')

class ProductCon {
    static show(req,res){
        Product.findAll()
        .then(result=>{
            res.status(200).json(
                result
            )
        })
        .catch(err=>{
            res.status(500).json(
                err
            )
        })
    }
    static add(req,res){
        let { name,description,imgUrl,price,stock,category_id } = req.body

        if(!name || !description || !imgUrl || !price || !stock) {
            res.status(400).json({
                msg : 'all field require'
            })
        } else if (price <0 || stock <0) {
            res.status(400).json({
                msg : 'price or stock cannot be minus number'
            })
        } else {
            Product.create({
                name,description,imgUrl,price,stock,category_id
            })
            .then(result=>{
                res.status(201).json({
                    msg : 'successfully adding product'
                })
            })
            .catch(err=>{
                let msg = err.errors[0].message
                res.status(500).json({
                    msg
                })
            })
        }


    }
    static edit(req,res){
        let { name,description,imgUrl,price,stock,category_id } = req.body

        if(!name || !description || !imgUrl || !price || !stock) {
            res.status(400).json({
                msg : 'all field require'
            })
        } else if (price <0 || stock <0) {
            res.status(400).json({
                msg : 'price or stock cannot be minus number'
            })
        } else {
            Product.findByPk(req.params.id)
            .then(result=>{
                if(result) {
                    Product.update({
                        name,description,imgUrl,price,stock,category_id
                    }, {
                        where : {
                            id : req.params.id
                        }
                    })
                    .then(result=>{
                        if(result) {
                            res.status(201).json({
                                msg : 'Product updated'
                            })
                        } else {
                            res.status(400).json({
                                msg : "product doesn't exist or has been delete"
                            })
                        }
                    })
                    .catch(err=>{
                        let msg = err.errors[0].message
                        res.status(500).json({
                            msg
                        })
                    })
                } else {
                    res.status(400).json({
                        msg : "product doesn't exist or has been delete"
                    })
                }
            })
            
        }
    }
    static delete(req,res){
        Product.destroy({
            where : {
                id : req.params.id
            }
        })
        .then(result=>{
            if(result===0) {
                res.status(400).json({
                    msg : "product doesn't exist or has been delete"
                })
            } else {
                res.status(200).json({
                    msg : 'Product Delete'
                })
            }
        })
        .catch(err=>{
            res.status(500).json({
                msg : "failed to delete product"
            })
        })
    }
}


module.exports = ProductCon