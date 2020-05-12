let {Product} = require('../models/index')
class ProductController {
  static showMyProduct (req, res, next) {
      
  }

  static showAllProduct (req, res, next) {
    Product.findAll({order:[['createdAt']]})
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      next(err)
    });
  }

  static addProduct (req, res, next) {
    let data = {
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      image_url: req.body.image_url,
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
}
module.exports = ProductController
