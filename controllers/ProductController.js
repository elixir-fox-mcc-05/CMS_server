const { Product } = require('../models')
const { Op } = require("sequelize")
class ProductController {

  static AdminfindAll(req, res, next) {
    Product.findAll({
        order: [
          ['updatedAt', 'DESC']
        ]
      })
      .then((data) => {
        return res.status(200).json({ data })
      })
      .catch((err) => {
        return next({
          name: 'NotFound',
          errors: [{ msg: 'Data Not Found' }]
        })
      })
  }

  static findAll(req, res, next) {
    Product.findAll({
        where: {
          stock: {
            [Op.gt]: 0
          }
        },
        order: [
          ['updatedAt', 'DESC']
        ]
      })
      .then((data) => {
        return res.status(200).json({ data })
      })
      .catch((err) => {
        next({
          name: 'NotFound',
          errors: [{ msg: 'Data Not Found' }]
        })
      })
  }

  static findOne(req, res, next) {
    const id = req.params.id
    Product.findOne({
        where: {
          id: id
        }
      })
      .then((data) => {
        return res.status(200).json({ data })
      })
      .catch((err) => {
        next({
          name: 'NotFound',
          errors: [{ msg: 'Data Not Found' }]
        })
      })
  }

  static addProduct(req, res, next) {
    const payload = {
      name: req.body.name,
      image: req.body.image,
      stock: +req.body.stock,
      description: req.body.description,
      price: +req.body.price
    }
    console.log(payload)
    Product.create(payload)
      .then((data) => {
        return res.status(201).json({
          name: data.name,
          image: data.image,
          stock: data.stock,
          description: data.description,
          price: data.price
        })
      })
      .catch((err) => {
        next({
          name: 'InternalServerError',
          errors: [{ msg: 'Failed to Create.' }]
        })
      })
  }

  static editProduct(req, res, next) {
    // const id = req.params.id
    const payload = {
      name: req.body.name,
      image: req.body.image,
      stock: +req.body.stock,
      description: req.body.description,
      price: +req.body.price
    }
    Product.update(payload, {
        where: {
          id: req.params.id
        }
      })
      .then((data) => {
        return res.status(201).json({
          name: req.body.name,
          image: req.body.image,
          stock: +req.body.stock,
          description: req.body.description,
          price: +req.body.price
        })
      })
      .catch((err) => {
        next({
          name: 'InternalServerError',
          errors: [{ msg: 'Failed to Update.' }]
        })
      })
  }

  static deleteProduct(req, res, next) {
    const id = req.params.id
    Product.destroy({
        where: {
          id: id
        }
      })
      .then((result) => {
        return res.status(201).json({ result })
      })
      .catch((err) => {
        next({
          name: 'InternalServerError',
          errors: [{ msg: 'Failed to Delete.' }]
        })
      })
  }
}

module.exports = ProductController