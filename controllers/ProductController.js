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
        return res.status(200).json(data)
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
        return res.status(200).json(data)
      })
      .catch((err) => {
        next({
          name: 'NotFound',
          errors: [{ msg: 'Data Not Found' }]
        })
      })
  }

  static findByGenre(req, res, next) {
    const genre = req.params.genre
    Product.findAll({
        where: {
          genre: genre,
          stock: {
            [Op.gt]: 0
          }
        }
      })
      .then((data) => {
        return res.status(200).json(data)
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
        return res.status(200).json(data)
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
      image_url: req.body.image_url,
      stock: +req.body.stock,
      description: req.body.description,
      price: +req.body.price,
      genre: req.body.genre
    }
    console.log(payload)
    Product.create(payload)
      .then((data) => {
        return res.status(201).json({
          id: data.id,
          name: data.name,
          image_url: data.image_url,
          stock: data.stock,
          description: data.description,
          price: data.price
        })
      })
      .catch((err) => {
        next(err)
      })
  }

  static editProduct(req, res, next) {
    const payload = {
      name: req.body.name,
      image_url: req.body.image_url,
      stock: +req.body.stock,
      description: req.body.description,
      price: +req.body.price,
      genre: req.body.genre
    }
    Product.update(payload, {
        where: {
          id: req.params.id
        }
      })
      .then((data) => {
        return res.status(201).json({
          id: +req.params.id,
          name: req.body.name,
          image_url: req.body.image_url,
          stock: +req.body.stock,
          description: req.body.description,
          price: +req.body.price,
          genre: req.body.genre
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