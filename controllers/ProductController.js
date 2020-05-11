const { Product } = require('../models');

class ProductController {
  static findAll(req, res, next) {
    Product.findAll()
      .then(result => {
        res.status(200).json({
          Products: result
        });
      })
      .catch(err => {
        return next(err);
      });
  }
  static createProduct(req, res, next) {
    let { name, image_url, price, stock } = req.body;
    Product.create({
      name,
      image_url,
      price,
      stock
    })
      .then(result => {
        res.status(201).json({
          Product: result
        });
      })
      .catch(err => {
        return next(err);
      });
  }
  static updateProduct(req, res, next) {}
  static deleteProduct(req, res, next) {}
}

module.exports = ProductController;
