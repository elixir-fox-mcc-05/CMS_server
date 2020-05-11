const { UserProduct } = require('../models')
const { Product } = require('../models')
const { User } = require('../models')
class UserProductController {
  static add(req, res, next) {
    console.log('test controller');
    const payload = {
      userId: req.currentUserId,
      productId: req.body.productId,
      quantity: req.body.quantity
    }
    UserProduct.findOne({ where: { productId: payload.productId, userId: payload.userId } })
      .then((data) => {
        if (data) {
          console.log('ketemu');
          let newdata = {
            quantity: +data.quantity + (+payload.quantity)
          }
          UserProduct.update(newdata, {
              where: {
                id: data.id
              }
            })
            .then((result) => {
              return res.status(201).json({
                result
              })
            })
        } else {
          console.log('gak ketemu');
          UserProduct.create(payload)
            .then((data) => {
              return res.status(201).json({
                id: data.id,
                userId: data.userId,
                productId: data.productId,
                quantity: data.quantity
              })
            })
        }
      })
      .catch((err) => {
        return next({
          name: 'InternalServerError',
          errors: [{ msg: 'Failed to Add.' }]
        })
      })
  }

  static findAll(req, res, next) {
    UserProduct.findAll({
        where: { userId: req.currentUserId },
        include: [{ model: Product }]
      })
      .then((data) => {
        console.log('test');
        return res.status(200).json(data)
      })
      .catch((err) => {
        return next({
          name: 'InternalServerError',
          errors: [{ msg: 'Failed to Show.' }]
        })
      })
  }

  static findOne(req, res, next) {
    UserProduct.findOne({
        where: {
          id: req.params.id
        },
        include: [Product]
      })
      .then((data) => {
        if (data) {
          return res.status(200).json(data)
        } else {
          return next({
            name: 'NotFound',
            errors: [{ msg: 'Data Not Found' }]
          })

        }
      })
      .catch((err) => {
        return next({
          name: 'InternalServerError',
          errors: [{ msg: 'Failed to Show.' }]
        })
      })
  }

  static delete(req, res, next) {
    console.log('proses delete di server')
    UserProduct.destroy({ where: { id: req.params.id } })
      .then((result) => {
        return res.status(201).json({ result })
      })
      .catch((err) => {
        return next({
          name: 'InternalServerError',
          errors: [{ msg: 'Failed to Show.' }]
        })
      })
  }
}
module.exports = UserProductController