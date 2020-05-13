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
  static findOne(req, res, next) {
    let { id } = req.params;
    Product.findOne({
      where: {
        id
      }
    })
      .then(result => {
        if (result) {
          res.status(200).json({
            Product: result
          });
        } else {
          return next({
            code: 404,
            message: `Product Not Found`
          });
        }
      })
      .catch(err => {
        return next(err);
      });
  }
  static createProduct(req, res, next) {
    let UserId = req.UserId;
    let { name, image_url, price, stock, CategoryId } = req.body;
    Product.create({
      name,
      image_url,
      price,
      stock,
      UserId,
      CategoryId
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
  static updateProduct(req, res, next) {
    let { name, image_url, price, stock, CategoryId } = req.body;
    let UserId = req.UserId;
    let { id } = req.params;
    let value = {
      name,
      image_url,
      price,
      stock,
      UserId,
      CategoryId
    };
    Product.update(value, {
      where: {
        id
      },
      returning: true
    })
      .then(data => {
        if (data[0] > 0) {
          res.status(200).json({
            Product: data[1][0]
          });
        } else {
          return next({
            code: 404,
            message: `Product Not Found`
          });
        }
      })
      .catch(err => {
        return next(err);
      });
  }
  static deleteProduct(req, res, next) {
    let UserId = req.UserId;
    let { id } = req.params;
    let deleted;
    Product.findOne({
      where: {
        id
      }
    })
      .then(result => {
        deleted = result;
        return Product.destroy({
          where: {
            id
          }
        });
      })
      .then(data => {
        if (deleted) {
          res.status(200).json({
            Product: deleted
          });
        } else {
          return next({
            code: 404,
            message: `Product Not Found`
          });
        }
      })
      .catch(err => {
        return next(err);
      });
  }
}

module.exports = ProductController;
