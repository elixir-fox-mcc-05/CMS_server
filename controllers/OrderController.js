const { Order, Cart, Product, PaymentChannel, sequelize } = require('../models');

class OrderController {
  static findAll(req, res, next) {
    let UserId = req.UserId;
    Order.findAll({
      where: {
        UserId
      },
      include: {
        model: PaymentChannel
      }
    })
      .then(result => {
        res.status(200).json({
          Orders: result
        });
      })
      .catch(err => {
        return next(err);
      });
  }
  static async addOrder (req, res, next) {
    const t = await sequelize.transaction();
    try {
      let UserId = req.UserId;
      let { first_name, last_name, address, PaymentChannelId, grandtotal } = req.body;
      let carts = await Cart.findAll({
        where: {
          UserId
        },
        include: {
          model: Product,
          attributes: ['id', 'name', 'image_url']
        },
        attributes: ['id', 'ProductId', 'total'],
        transaction: t
      })
      let items = JSON.stringify(carts)
      let decrementStock = await Promise.all(carts.map(cart => {
        Product.decrement({
          stock: cart.total
        }, {
          where: {
            id: cart.ProductId
          },
          transaction: t
        })
      }))
      let destroyCart = await Cart.destroy({
        where: {
          UserId
        },
        transaction: t
      })
      let createOrder = await Order.create({
        first_name,
        last_name,
        address,
        items,
        PaymentChannelId,
        grandtotal,
        UserId
      }, {
        transaction: t
      })
      await t.commit();
      return res.status(200).json({
        Order: createOrder
      })
    } catch(err) {
        return next(err)
      } 
  }
}

module.exports = OrderController;