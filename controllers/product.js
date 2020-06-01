const Model = require('../models');
const Product = Model.Product;

class ProductController {
  static addProduct(req, res, next) {
    let values = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
      UserId: req.signedInUserId,
    };

    Product.create(values)
      .then((data) => {
        res.status(201).json({
          CreatedProduct: data,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static findAllProducts(req, res, next) {
    Product.findAll()
      .then((data) => {
        res.status(200).json({
          Products: data,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static getAProduct(req, res, next) {
    let options = {
      where: {
        id: req.params.id,
      },
    };

    Product.findOne(options)
      .then((data) => {
        if (data) {
          res.status(200).json({
            Product: data,
          });
        } else {
          throw {
            code: 404,
            type: 'NOT FOUND',
            message: 'Sorry, not found',
          };
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static updateProduct(req, res, next) {
    let values = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
      UserId: req.signedInUserId,
    };

    let options = {
      where: {
        id: req.params.id,
      },
      returning: true,
    };

    Product.update(values, options)
      .then((data) => {
        res.status(201).json({
          UpdatedProduct: data[1][0],
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static deleteProduct(req, res, next) {
    let options = {
      where: {
        id: req.params.id,
      },
    };
    let choosed = null;
    
    Product.findOne(options)
      .then((data) => {
        choosed = data;
        Product.destroy(options);
      })
      .then((_) => {
        res.status(200).json({
          DeletedProduct: choosed,
        });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = ProductController;
