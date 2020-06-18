const {Product} = require("../models/index.js")

class productController{
  static findAll(req,res,next){
    Product.findAll(
      { order: [['updatedAt', 'DESC']] }
    )
      .then(result => {
        res.status(200).json({
          message: 'All products successfully read',
          allProducts: result
        })
      })
      .catch(error =>{
        console.log(error)
        next(error)
      })
  }
  static findOne(req,res,next){
      let selectedId = req.params.id
      Product.findByPk(selectedId)
        .then(result =>{
            if(result) {
              res.status(200).json({
                message: 'selected product successfully read',
                selectedProduct: result
              })
            } else {
              return next({
                message: 'Selected product does not exist'
              })
            }
        })
        .catch(error =>{
            // console.log(error)
            return next(error)
        })
  }
  static addProduct (req,res,next){
    let { name, image_url, price, stock, category } = req.body
    let UserId = req.currentUserId
    let newProduct = {
        name,
        image_url,
        price,
        stock,
        category,
        UserId
    }
    Product.create(newProduct)
      .then(result => {
        res.status(201).json({
          message: 'Successfully added a new product',
          newProduct: result
        })
      })
      .catch(error => {
        next(error)
      })
  }
  static updateProductInfo(req,res, next){
    let selectedId = req.params.id
    let { name, image_url, price, stock, category } = req.body
    let updatedProduct = {
      name,
      image_url,
      price,
      stock,
      category,
      UserId: req.currentUserId
    }
    Product.update(updatedProduct,{
        where:{
          id: selectedId
        },
        returning:true
    })
      .then(result => {
          res.status(201).json({
            message: 'Product successfully updated',
            updatedProduct: result
        })
      })
      .catch(error => {
        return next(error)
      })
  }
  static deleteProducts(req,res,next){
     let selectedId = req.params.id
     Product.destroy({
        where:{
            id:selectedId
        }
     })
       .then(_ =>{
           res.status(200).json({
              message: "Selected task successfully deleted"
           })
       })
       .catch(error => {
           return next(error)
       })
  }

}

module.exports = productController