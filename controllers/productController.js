const { Product } = require('../models/index');
const { Op } = require('sequelize')

class ProductController {
    // router.post('/', productController.createProduct);
    static createProduct(req, res, next){
        let { name, description, image_url, price, stock } = req.body
        let input = {
            name,
            description,
            image_url,
            price: Number(price),
            stock: Number(stock)
        }
        Product.create(input)
            .then(data => {
                return res.status(201).json({
                    product: data
                })
            })
            .catch(err => {
                return next(err)
            })
    }

    // router.get('/', productController.readAllProduct);
    static readAllProduct(req, res, next){
       let options = {
           order: [[`createdAt`, 'DESC']]
       }
       Product.findAll(options)
            .then(data => {
                res.status(200).json({
                    products: data
                })
            })
            .catch(err => {
                return next(err)
            })
    }

    // router.put('/:productId', productController.updateProduct);
    static updateProduct(req, res, next){
        let { productId } = req.params;
        let options = {
            where: {
                id: Number(productId)
            },
            returning: true,
            individualHooks: true
        }
        let { name, description, image_url, price, stock } = req.body
        let input = {
            name,
            description,
            image_url,
            price: Number(price),
            stock: Number(stock)
        }
        Product.update(input, options)
            .then (data => {
                if(data[1][0]){
                    return res.status(200).json({product: data[1][0], message: `Product id ${productId} update`});
                }
                else {
                    return next({ 
                        name: 'NotFound',
                        errors: [{
                            message: `Product with id ${productId} not found`
                        }]
                    })
                }
            })
            .catch(err => {
                return next(err);
            })
    }

    // router.delete('/:productId', productController.deleteProduct);
    static deleteProduct(req, res, next){
        let { productId } = req.params;
        let options = {
            where: {
                id: Number(productId)
            }
        }
        Product.destroy(options)
            .then (data => {
                if(data){
                    return res.status(200).json({message: `Product id ${productId} delete`});
                }
                else {
                    return next({ 
                        name: 'NotFound',
                        errors: [{
                            message: `Product with id ${productId} not found`
                        }]
                    })
                }
            })
            .catch(err => {
                return next(err);
            })
    }

    // router.get('/:productId', productController.searchProduct);
    static searchProduct(req, res, next){
        let { productId } = req.params;
        let options = {
            where: {
                id:Number(productId)
            }
        }
        Product.findOne(options)
            .then(data => {
                if(data){
                    return res.status(200).json({product: data})
                }
                else {
                    return next({ 
                        name: 'NotFound',
                        errors: [{
                            message: `Product with id ${productId} not found`
                        }]
                    })
                }
            })
            .catch(err => {
                return next(err)
            })
    }

    // router.post('/byName', ProductController.readProductsByName)
    static readProductsByName(req, res, next){
        let { name } = req.body
        let convertName = null
        let option = null
        if (name) {
            convertName = name.toLowerCase()
            option = {
                order: [
                    [`stock`, `DESC`],
                    [`updatedAt`, 'DESC']
                ],
                where: {
                    name: {
                        [Op.like]: `%${convertName}%`
                    }
                }
            }
        }
        else {
            option = {
                order: [
                    [`stock`, `DESC`],
                    [`updatedAt`, 'DESC']
                ]
            }
        }
        Product.findAll(option)
            .then(data => {
                if(data.length !== 0){
                    res.status(200).json({
                        products: data
                    })
                }
                else {
                    return next({
                        name: 'NotFound',
                        errors: [{
                            message: `Product not found`
                        }]
                    })
                }
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = ProductController


