const {Product} = require('../models')

class ProductController{
    static list(req,res,next){
        Product 
            .showAll()
            .then(data => {
                res.status(200).json({
                    data
                })
            })
            .catch(err => {
                next(err)
            })
    }
    static add(req,res){
        let {name , image_url, price ,stock, category} = req.body 

        Product
            .create({name,image_url,price,stock,category})
            .then(data => {
                res.status(201).json({
                    data
                })
            })
            .catch(err => {
                res.status(400).json({
                    err : err.message
                })
            })

    }
    static select (req,res,err){

        Product 
            .findOne({where : {id : req.params.id}})
            .then(data => {
                res.status(200).json({
                    data
                })
            })
            .catch(err => {
                next(err)
            })

    }
    static edit(req,res){

        let {name , image_url, price ,stock, category} = req.body 

        Product 
            .update({name , image_url, price ,stock, category},{where : {id : req.params.id}})
            .then(data => {
                res.status(200).json({
                    data
                })
            })
            .catch(err => {
                res.status(400).json({
                    error : err.message
                })
            })
    }
    static delete(req,res){

        let results;

        Product
            .findByPk(req.params.id)
            .then(data1 => {
                        results = Object.assign(data1)
                        return Product.destroy({where : {id : req.params.id},returning : true})
                        })
            .then(data2 => {
                res.status(200).json({product : results})
            })
            .catch(err => res.status(400).json({error : err.message}))

    }
    static search(req,res){

        Product
            .findOne({where: req.body.name})
            .then(data => {
                res.status(200).json({
                    data
                })
            })
            .catch(err => {
                res.status(400).json({
                    error : 'not found'
                })
            })
    }
}

module.exports = ProductController