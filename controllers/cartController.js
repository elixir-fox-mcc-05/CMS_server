const { Cart, Product, User } = require("../models");

class CartController {
  static findAll(req, res, next) {
    let UserId = req.currentUserId;
    Cart.findAll({
      where: {
        UserId
      },
      include: {
        model: Product,
        include: {
          model: User
        }
      }
    })
      .then((result) => {
        res.status(200).json({
          carts: result
        });
      })
      .catch((err) => {
        return next(err);
      });
  }
  
  static addToCart(req, res, next) {
    let { ProductId, total, notes } = req.body;
    if (total < 0)
      return next({
        code: 400,
        message: "Total cannot be negative values"
      });
    let UserId = req.currentUserId;
    Cart.findOne({
      where: {
        ProductId,
        UserId
      }
    })
      .then((result) => {
        if (result) {
          return Cart.update(
            {
              total: result.total + total,
              notes
            },
            {
              where: {
                id: result.id
              },
              returning: true
            }
          );
        } else {
          return Cart.create({
            UserId,
            ProductId,
            total,
            notes
          });
        }
      })
      .then((data) => {
        res.status(201).json({
          cart: data
        });
      })
      .catch((err) => {
        return next(err);
      });
  }

  static deleteCart(req, res, next) {
    let { id } = req.params;
    Cart.destroy({
      where: { id },
    })
      .then((data) => {
        if (data) {
          res.status(200).json({
            msg: `cart with id ${id} succesfully deleted`,
          });
        }
      })
      .catch((err) => {
        next(err);
      }); 
  }
}

module.exports = CartController;
