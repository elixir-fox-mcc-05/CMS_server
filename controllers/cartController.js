const {Cart,Product} = require('../models')

class CartController{

    static list (req,res){
        Cart
            .findAll()
            .then(data => {
                res.status(200).json({

                })
            })
            .catch(err => {
                res.status(400).json({

                })
            })
    }

    static checkout (req,res){

        Cart
            .findAll({where : {
                                UserId: req.LoginId,
                                isPaid: false
                                }})
            .then(data => {
                res.status(200).json({

                })
            })
            .catch(err => {
                res.status(400).json({

                })
            })
    }

    static add (req,res){

        let newCart = {
            ProductId : req.body.ProductId,
            UserId : req.body.LoginId,
            quantity : req.body.quantity,
            isPaid : false
        }

        Cart
            .create(newCart)
            .then(data => {
                res.status(201).json({

                })
            })
            .catch(err => {
                res.status(404).json({

                })
            })
    }

    static confirm(req,res){
        // let {id} = req.body 
        // console.log(req.params.id)
        Cart
            .update({isPaid : true},{where : {id : req.params.id}})
            .then(data => {
                // console.log(data)
                return Product.findByPk(req.params.id) 
            })
            .then(data => {
                // console.log(data)
                res.status(200).json({
                    id : req.body.id,
                    ProductId : req.body.ProductId,
                    UserId : req.body.LoginId,
                    quantity : req.body.quantity,
                    isPaid : req.body.isPaid
                })
            })
            .catch(err => {
                let errorfix = err.message
                if(errorfix.includes(',')){
                    errorfix = errorfix.split(',')
                    for (let i=0 ; i <errorfix.length ; i++){
                        errorfix[i] = errorfix[i].replace('Validation error: ','').replace('\n','')
                        errorfix[i] = errorfix[i].replace('notNull Violation: ','')
                        if (errorfix[i].charAt(errorfix[i].length-1) == ' '){
                            errorfix[i] = errorfix[i].slice(0, -1); 
                        }
                    }

                }else {
                    errorfix = errorfix.replace('Validation error: ','')
                    errorfix = errorfix.replace('notNull Violation: ','')
                }
                res.status(400).json({
                    error : errorfix
                })
            })
    }

    static delete (req,res){
        let results;

        Cart
            .findByPk(req.params.id)
            .then(data1 => {
                console.log(data1.id)
                if(data1.id == req.params.id){
                    results = Object.assign(data1)
                    return Cart.destroy({where : {id : req.params.id},returning : true})
                }else{
                    res.status(404).json({error : "not found"})
                }
                        })
            .then(data2 => {
                res.status(200).json({  id : results.id,
                                        ProductId : results.ProductId,
                                        UserId : results.UserId,
                                        stock : results.stock,
                                        isPaid : results.isPaid})
            })
            .catch(err => {
                console.log(err.message)
                res.status(404).json({error : "not found"})
            })
    }
}

module.exports = CartController