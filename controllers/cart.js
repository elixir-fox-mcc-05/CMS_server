const Model = require('../models');
const Product = Model.Product;
const Cart = Model.Cart;

class CartController {
  static addCart(req, res, next) {
    let options = {
      where: {
        id: req.body.ProductId,
      },
    };
    Product.findOne(options)
      .then((data) => {
        if (data) {
          if (data.stock < req.body.quantity) {
            throw {
              code: 400,
              type: 'BAD REQUEST',
              message:
                'Sorry, product stock is less than request, please recheck stock and refresh browser',
            };
          } else {
            let options = {
              where: {
                UserId: req.signedInUserId,
                status: false,
                ProductId: req.body.ProductId,
              },
            };
            return Cart.findOne(options);
          }
        } else {
          throw {
            code: 404,
            type: 'NOT FOUND',
            message: 'Sorry, product not found',
          };
        }
      })
      .then((data) => {
        let values = {
          UserId: req.signedInUserId,
          ProductId: req.body.ProductId,
          quantity: req.body.quantity,
        };
        let create = () => {
          return Cart.create(values);
        };
        if (data) {
          if (data.ProductId == req.body.ProductId) {
            throw {
              code: 400,
              type: 'BAD REQUEST',
              message: 'Already in cart, please update in cart page',
            };
          } else {
            return create();
          }
        } else {
          return create();
        }
      })
      .then((data) => {
        res.status(201).json({
          CreatedCartItem: data,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static findNotYetPaid(req, res, next) {
    let options = {
      where: {
        UserId: req.signedInUserId,
        status: false,
      },
      include: [{ model: Product }],
    };
    Cart.findAll(options)
      .then((data) => {
        res.status(200).json({
          CartNotYetPaid: data,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static findPaid(req, res, next) {
    let options = {
      where: {
        UserId: req.signedInUserId,
        status: true,
      },
      include: [{ model: Product }],
    };
    Cart.findAll(options)
      .then((data) => {
        res.status(200).json({
          CartPaid: data,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static checkout(req, res, next) {
    let options = {
      where: {
        UserId: req.signedInUserId,
        status: false,
      },
      include: [{ model: Product }],
    };
    Cart.findAll(options)
      .then((data) => {
        if (data.length > 0) {
          data.forEach((element) => {
            if (element.Product.stock < element.quantity) {
              Cart.destroy(options)
                .then((data) => {
                  throw {
                    code: 400,
                    type: 'BAD REQUEST',
                    message:
                      "Sorry, some product's stock is less than newest stock, all cart's items will be reseted",
                  };
                })
                .catch((err) => {
                  next(err);
                });
            }
          });
          console.log('MASUK');
          let values = {
            status: true,
          };
          let options = {
            where: {
              UserId: req.signedInUserId,
              status: false,
            },
          };
          return Cart.update(values, options);
        } else {
          throw {
            code: 400,
            type: 'BAD REQUEST',
            message: 'Nothing in Cart',
          };
        }
      })
      .then((data) => {
        console.log(data);
        if (data == 1) {
          res.status(201).json({
            CheckoutItems: 'Success checkout, please check purchase history',
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = CartController;
