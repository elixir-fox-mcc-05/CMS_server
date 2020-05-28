const { Cart, Product, User } = require('../models');

class CartController {
  static findAll(req, res, next) {
    let UserId = req.UserId;
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
      .then(result => {
        res.status(200).json({
          Carts: result
        });
      })
      .catch(err => {
        return next(err);
      })
  }
  static addToCart(req, res, next) {
    let { ProductId, total, notes } = req.body;
    if (total < 0) return next({
      code: 400,
      message: 'Total cannot be negative values'
    });
    let UserId = req.UserId;
    Cart.findOne({
      where: {
        ProductId,
        UserId
      }
    })
      .then(result => {
        if(result) {
          return Cart.update({
            total: result.total + total,
            notes
          }, {
            where: {
              id: result.id
            },
            returning: true
          })
        } else {
          return Cart.create({
            UserId,
            ProductId,
            total,
            notes
          })
        }
      })
      .then(data => {
        res.status(201).json({
          Cart: data
        });
      })
      .catch(err => {
        return next(err);
      })
  }
  static deleteCart(req, res, next) {
    let UserId = req.UserId;
    let { ProductId } = req.body;
    let deleted;
    Cart.findOne({
      where: {
        ProductId,
        UserId
      }
    })
      .then(result => {
        if(result) {
          deleted = result;
          return Cart.destroy({
            where: {
              id: result.id
            }
          })
        } else {
          return next({
            code: 404,
            message: `Item not found`
          })
        }
      })
      .then(result => {
        res.status(200).json({
          Cart: deleted
        })
      })
      .catch(err => {
        return next(err);
      })
  }
}

module.exports = CartController;