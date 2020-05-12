const {Product} = require('../models')

class ProductController{
    static list(req,res,next){
        Product 
            .findAll({order : [['id','ASC']]})
            .then(data => {
                res.status(200).json({
                    data
                })
            })
            .catch(err => {
                // console.log(err.message)
                next(err)
            })
    }
    static add(req,res,next){
        let {name , image_url, price ,stock, category} = req.body 

        Product
            .create({name,image_url,price,stock,category})
            .then(data => {
                // console.log(data)
                res.status(201).json({
                    id : data.id,
                    name:data.name,
                    image_url : data.image_url,
                    price : data.price,
                    stock : data.stock,
                    category : data.category
                })
            })
            .catch(err => {
                // console.log(err.message)
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
                }
                res.status(400).json({
                    error : errorfix
                })
            })

    }
    static select (req,res,next){

        Product 
            .findOne({where : {id : req.params.id}})
            .then(data => {
                res.status(200).json({
                    name : data.name,
                    image_url : data.image_url,
                    price : data.price,
                    stock: data.stock,
                    category : data.category
                })
            })
            .catch(err => {
                res.status(404).json({
                    error: 'not found'
                })
                // next(err)
            })

    }
    static edit(req,res){

        let {name , image_url, price ,stock, category} = req.body 
        // console.log(req.params.id)
        Product 
            .update({ 'name' : name ,'image_url' : image_url, 'price':price ,'stock':stock, 'category':category},{where : {id : req.params.id}})
            .then(data => {
                // console.log(data)
                return Product.findByPk(req.params.id) 
            })
            .then(data => {
                // console.log(data)
                res.status(200).json({
                    name : data.name,
                    image_url : data.image_url,
                    price : data.price,
                    stock : data.stock,
                    category : data.category
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
                }
                res.status(400).json({
                    error : errorfix
                })
            })
    }
    static delete(req,res){

        let results;

        Product
            .findByPk(req.params.id)
            .then(data1 => {
                console.log(data1.id)
                if(data1.id == req.params.id){
                    results = Object.assign(data1)
                    return Product.destroy({where : {id : req.params.id},returning : true})
                }else{
                    res.status(404).json({error : "not found"})
                }
                        })
            .then(data2 => {
                res.status(200).json({name : results.name,
                                        image_url : results.image_url,
                                        price : results.price,
                                        stock : results.stock,
                                        category : results.category})
            })
            .catch(err => {
                console.log(err)
                res.status(404).json({error : "not found"})
            })

    }
    static search(req,res){
        console.log(req.body.name)
        Product
            .findOne({where:{name : req.body.name}})
            .then(data => {
                res.status(200).json({
                    name : data.name,
                    image_url : data.image_url,
                    price : data.price,
                    stock: data.stock,
                    category : data.category
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