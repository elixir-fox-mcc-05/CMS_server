const { UserProduct } = require('../models')
const { Product } = require('../models')
class UserProductController {
  static add(req, res, next) {
    console.log('test controller');
    const payload = {
      userId: req.currentUserId,
      productId: req.body.productId,
      quantity: +req.body.quantity
    }
    UserProduct.findOne({where: {
      userId: payload.userId,
      productId: payload.productId
    }})
    .then((result) => {
      if(result) {
        let newdata = {
          quantity: result.quantity + payload.quantity
        }
        return UserProduct.update(newdata, {
          where: {
            id: result.id  
          }
        })
      } else {
        return UserProduct.create(payload)
      }
    })
    .then((data) => {
      return res.status(201).json({
        id: data.id,
        userId: data.userId,
        productId: data.productId,
        quantity: data.quantity
      })
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
        include: [{ model: Product }],
        order: [
            ['id', 'DESC']
        ]
      })
      .then((data) => {
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
  
  static edit(req,res,next) {
    const payload = {
      id: req.params.id,
      quantity: +req.body.quantity
    }
    UserProduct.findOne({where:{id: payload.id}})
    .then((data)=>{
      let newdata = {
            quantity: +data.quantity + (+payload.quantity)
          }
      UserProduct.update(newdata, {
        where: {
          id: data.id
        }
      })
      .then((result) => {
        return res.status(201).json({result})
      })
    })
    .catch((err)=>{
      next(err)
    })
  }

  static delete(req, res, next) {
    console.log('proses delete di server')
    UserProduct.destroy({ where: { id: +req.params.id } })
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