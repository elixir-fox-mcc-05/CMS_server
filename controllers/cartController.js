const { Cart, Product, User } = require("../models/index.js")

class cartController {
  static findAll(req,res, next){
    Cart.findAll({
        attributes: [ 'id', 'UserId', 'ProductId', 'quantity' ],
        where:{
          UserId: req.currentUserId
        },
        order:[['updatedAt', 'DESC']],
        include: [ User, Product ] 
    })
      .then(result =>{
          res.status(200).json({
            message:"All cart products successfully read",
            cartProductList: result
          })
      })
      .catch(error =>{
        // console.log("cartController- findAll Error", error)
        next(error)
      })
  }
  static findOne(req,res,next){
    let specifiedId = req.params.id
    Cart.findOne({
        where:{
            id: specifiedId, 
            UserId: req.currentUserId
        },
        include: [ User, Product ] 
    })
    .then(result => {
        if(result) {
            res.status(200).json({
                message:"Specified cart product successfully read",
                selectedCartProduct: result
            })
        } else {
            next({
                error:'Unauthorized request',
                message: 'User unauthorized to make this request'
            })
        }
    })
    .catch(error => {
        // console.log(error)
        next(error)
    })
  }
  static addProductToCard(req,res,next){
    let UserId = req.currentUserId
    let ProductId = req.body.ProductId
    let purchaseQuantity = +req.body.quantity
    let newCartPayload = {
      UserId,
      ProductId,
      quantity: purchaseQuantity
    }
    Cart.findOne(
      { where: {
        UserId:UserId,
        ProductId:ProductId
      }
    })
    .then(result => {
      if (result) {
        // Kalau ada, update quantity-nya
        let updatedCartPayload = {
          UserId,
          ProductId,
          quantity: result.quantity += purchaseQuantity
        }
        Cart.update(updatedCartPayload, {
          where: {
            UserId:UserId,
            ProductId:ProductId
          }
        })
        .then (_ => {
          return Product.findOne({
            where:{
              id: ProductId
            }
          })
        })
        .then(productResult => {
          let {name, image_url, price, stock, category} = productResult
          let payload = {
            name,
            image_url,
            price,
            stock: (stock - purchaseQuantity),
            category,
            UserId: req.currentUserId
          }
          return Product.update(payload, {where:{
            id:ProductId
          }})
        })
        .then(productUpdated => {
          res.status(201).json({
            message:"Successfully updated product stock after purchase",
            addedProduct: productUpdated
          })
        })
        .catch (error => {
          console.log(error)
          next({
            message:"Internal Server Error",
            error: error
          })
        })

      } else {
        // Kalau tidak ada, buatin baru
        Cart.create(newCartPayload)
        .then(result3 => {
          console.log({
            message:'Product successfully added into cart',
            result3
          })
          return Product.findOne({
            where:{
              id: ProductId
            }
          })
        })
        .then(productResult => {
          let {name, image_url, price, stock, category} = productResult
          let payload = {
            name,
            image_url,
            price,
            stock: (stock - purchaseQuantity),
            category,
            UserId: req.currentUserId
          }
          // console.log('YYYYYYYYYYYYYYYYYY')
          // console.log(payload)
          // console.log('YYYYYYYYYYYYYYYYYY') 
          return Product.update(payload, {where:{
            id:ProductId
          }})
        })
        .then(productUpdated => {
          res.status(201).json({
            message:"Successfully updated product stock after purchase",
            addedProduct: productUpdated
          })
        })
        .catch(error => {
          next({
            message:'InternalServerError',
            error:error
          })
        })

      }
    })
    .catch(error => {
      console.log("-----------------------")
      console.log(error)
      console.log("Cart | Create Error - ", error)
    })
  }
  static editProductQuantity(req,res,next) {
    let cartId = req.params.cartId
    let newQuantity = req.body.quantity
    Cart.update({ quantity: newQuantity }, {
        where:{
          id: cartId,
          UserId: req.currentUserId 
        },
        returning: true
    })
      .then(result => {
        if(result){
          res.status(200).json({
          message:"Successfully update product quantity in cart",
          updatedProduct: result
          })
        } else {
          next({
              message:"Unauthorized request",
              error: 'User unauthorized to make this request'
          })
        }
      })
      .catch(error => {
        next(error)
      })
    }
  static deleteProductinCart(req,res,next) {
    // findOne - Get details
    // update according to details
    // delete selected in cart
    let cartId = req.params.cartId
    let cancelledQuantity = +req.headers.quantity
    let productId = req.headers.productid
    Product.findOne({
      where: {
        id: productId
      }
    })
      .then(productResult => {
        let {name, image_url, price, stock, category} = productResult
        let payload = {
          name,
          image_url,
          price,
          stock: (stock += cancelledQuantity),
          category,
          UserId: req.currentUserId
        }
        return Product.update(payload, {where:{
          id:productId
        }})
      })
      .then(_ => {
        Cart.destroy({
          where:{
            id: cartId,
            UserId: req.currentUserId
          }
        })
      })
      .then(result =>{
        res.status(200).json({
          message:"Product in cart successfully deleted"
        })
      })
      .catch(error => { 
        next(error)
      })
  }
  static deleteAllProductinCart (req,res,next) {
    Cart.destroy({
      where:{
        UserId: req.currentUserId
      }
    })
    .then(result => {
      res.status(200).json({
        message: "Shopping cart successfully cleared"
      })
    })
    .catch(error => {
      next(error)
    })
  }  
}

module.exports = cartController