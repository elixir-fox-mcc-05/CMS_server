let {Product, User, Cart} = require('../models/index')
class ProductController {

  static detailProduct (req, res, next) {
      Product.findOne({ where: {id : req.params.id}})
      .then((result) => {
        res.status(200).json(result)
      }).catch((err) => {
        next(err)
      });
  }

  static showAllProduct (req, res, next) {
    Product.findAll({order:[['id']]})
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      next(err)
    });
  }

  static addProduct (req, res, next) {
    console.log('ssssssssssssssssssssssssssssssssssssssssssssssssssssssss');
    console.log('masukkkkk adaa');
    let data = {
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      image_url: req.body.image,
      tags: req.body.tags
    }
    Product.create(data)
    .then((result) => {
      let payload = {
        name: result.name,
        price: result.price,
        stock: result.stock,
        image_url: result.image_url,
        tags: result.tags
      }
      res.status(201).json(payload)
    })
    .catch((err) => {
      next(err)
    });
  }
  static addCart (req, res, next) {
    Product.findOne({ where: {id : req.params.id}})
      .then((result) => {
        if (result.stock > req.body.demand) {
          console.log(result.price);
          Cart.create({
            UserId: req.currentUserId,
            ProductId: req.params.id,
            demand: req.body.demand,
            subTotal: (result.price * req.body.demand)
          })
          .then((result) => {
            res.status(201).json(result)
          }).catch((err) => {
            throw err
          });
        } else {
          console.log('tidak bisa');
        }
        
      }).catch((err) => {
        next(err)
      });
  }
  static myCart (req, res, next) {
    Cart.findAll({
      include: [Product, User],
      where: {
        UserId: req.currentUserId
      }
    })
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      console.log(err);
    });
  }

  static restock (req, res, next) {
    let newStock = req.body.stock += 1
    if (req.body.step == 'down') {
      newStock -= 2
    }
    console.log(newStock);
    Product.update(
      {stock: newStock},
      {returning: true, where: {id: req.params.id}}
    )
      .then((result) => {
        res.status(200).json(result)
      }).catch((err) => {
        console.log(err);
      })
  }
  static delete (req, res, next) {
    Product.destroy({
      where: {
          id: req.params.id
      }
    })
  }
}
module.exports = ProductController
