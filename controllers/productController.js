const { Product } = require('../models');

class productController {
  static createProduct(req, res, next) {
    let { name, image_url, price, stock } = req.body;
    Product.create({
      name,
      image_url,
      price,
      stock,
    })
      .then((data) => {
        res.status(201).json({
          data,
          msg: 'Product succesfully created',
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  // static showProduct(req, res, next) {
  //   Product
  //   .findAll()
  //   .then(data=>{
  //     res.status(201).json({
  //       products : data
  //     })
  //   })
  // }
}

module.exports = productController;
