const { Product } = require("../models");

class productController {
  static createProduct(req, res, next) {
    let UserId = req.currentUserId
    let { name, image_url, price, stock } = req.body;
    Product.create({
      name,
      image_url,
      price,
      stock,
      UserId
    })
      .then((data) => {
        res.status(201).json({
          product: data,
          msg: "Product succesfully created"
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static findAll(req, res, next) {
    Product.findAll({
      order: [["id", "ASC"]]
    })
      .then((data) => {
        res.status(200).json({
          products: data
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static findOne(req, res, next) {
    let { id } = req.params;
    Product.findByPk(id)
      .then((data) => {
        res.status(200).json({
          product: data
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static updateProduct(req, res, next) {
    let { id } = req.params;
    let updateProduct = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock
    };

    Product.update(updateProduct, {
      where: { id },
      returning: true
    })
      .then((result) => {
        res.status(201).json({
          msg: `Product succesfully updated`
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static deleteProduct(req, res, next) {
    let { id } = req.params;
    Product.destroy({
      where: { id }
    })
      .then((data) => {
        if (data) {
          res.status(200).json({
            msg: `Product succesfully deleted`
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = productController;
