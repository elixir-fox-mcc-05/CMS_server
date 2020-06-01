const {Product, Category} = require('../models')
let imgur = require('imgur')

class ProductController{
    static list(req,res,next){
        Product 
            .findAll({order : [['id','ASC']],include : [Category]})
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
        console.log(req.file)
        let {name, price ,stock, CategoryId} = req.body 
        
        const encoded = req.file.buffer.toString('base64')
        
        imgur.uploadBase64(encoded)
            .then( json => {
                // res.status(201).json({
                //     url: json.data.link
                // })
                console.log(json.data.link)
                return Product.create({name,'image_url': json.data.link,price,stock,CategoryId})
            })
            .then(data => {
                        // console.log(data)
                        res.status(201).json({
                            id : data.id,
                            name:data.name,
                            image_url : data.image_url,
                            price : data.price,
                            stock : data.stock,
                            CategoryId : data.CategoryId
                        })
                    })
            .catch(err => {
                        // console.log(err.message)
                        let errorfix = err.message
                        if(errorfix.includes(',')){
                            errorfix.replace('category is required field','')
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

        // Product
        //     .create({name,image_url,price,stock,CategoryId})
        //     .then(data => {
        //         // console.log(data)
        //         res.status(201).json({
        //             id : data.id,
        //             name:data.name,
        //             image_url : data.image_url,
        //             price : data.price,
        //             stock : data.stock,
        //             CategoryId : data.CategoryId
        //         })
        //     })
        //     .catch(err => {
        //         // console.log(err.message)
        //         let errorfix = err.message
        //         if(errorfix.includes(',')){
        //             errorfix.replace('category is required field','')
        //             errorfix = errorfix.split(',')
        //             for (let i=0 ; i <errorfix.length ; i++){
        //                 errorfix[i] = errorfix[i].replace('Validation error: ','').replace('\n','')
        //                 errorfix[i] = errorfix[i].replace('notNull Violation: ','')
        //                 if (errorfix[i].charAt(errorfix[i].length-1) == ' '){
        //                     errorfix[i] = errorfix[i].slice(0, -1); 
        //                 }
        //             }

        //         }else {
        //             errorfix = errorfix.replace('Validation error: ','')
        //         }
        //         res.status(400).json({
        //             error : errorfix
        //         })
        //     })

    }
    static select (req,res,next){

        Product 
            .findOne({where : {id : req.params.id}, include : [Category]})
            .then(data => {
                res.status(200).json({
                    id  : data.id,
                    name : data.name,
                    image_url : data.image_url,
                    price : data.price,
                    stock: data.stock,
                    CategoryId : data.CategoryId
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

        let {name , image_url, price ,stock, CategoryId} = req.body 
        // console.log(req.params.id)
        Product 
            .update({ 'name' : name ,'image_url' : image_url, 'price':price ,'stock':stock, 'CategoryId':CategoryId},{where : {id : req.params.id}})
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
                    CategoryId : data.CategoryId
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
    static delete(req,res){

        let results;

        Product
            .findByPk(req.params.id)
            .then(data1 => {
                // console.log(data1.id)
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
                                        CategoryId : results.CategoryId})
            })
            .catch(err => {
                // console.log(err.message)
                res.status(404).json({error : "not found"})
            })

    }
    static search(req,res){
        // console.log(req.body.name)
        Product
            .findOne({where:{name : req.body.name}})
            .then(data => {
                res.status(200).json({
                    name : data.name,
                    image_url : data.image_url,
                    price : data.price,
                    stock: data.stock,
                    CategoryId : data.CategoryId
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