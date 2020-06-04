const {Transaction, Product} = require('../models')

class ControllerTransaction {
  static CreateTransaction(req, res, next) {
    const UserId = req.currentUser
    const { ProductId } = req.body
    const value = {
      UserId,
      ProductId: parseInt(ProductId)
    }
    Transaction
      .findOne({where : {ProductId, status:false}})
      .then(data => {
        if(data) {
          return next({
            code: 400,
            type: 'Bad Request',
            msg: 'Wishlist already exist'
          })
        } else {
          return Transaction.create(value)
        }
      })
      .then(transaction => {
        return Transaction.findByPk(transaction.id, {include: Product})
      })
      .then(transaction => {
        res.status(201).json({
          Wishlist: transaction
        })
      })
      .catch(err => {
        return next(err)
      })
  }
  static findAll(req, res, next) {
    const UserId = req.currentUser
    Transaction
      .findAll({where: {UserId, status:false}, include: Product})
      .then(result => {
        res.status(200).json({
          Wishlist: result
        })
      })
      .catch(err => {
        return next(err)
      })
  }
  static checkOut(req, res, next) {
    const {listCheckOut} = req.body
    const userId = req.currentUser
    const promise = []
    const promises = listCheckOut.forEach(element => {
      const value = {
        quantity: element.quantity,
        status: true,
        price: element.Product.price * element.quantity
      }
      promise.push(Transaction.update(value, {where: {id: element.id}}))
      promise.push(Product.decrement('stock', {by: element.quantity, where: {id: element.Product.id}}))
    })
    Promise
      .all(promise)
      .then(data => {
        console.log('nice')
      })
      .catch(err => {
        return next(err)
      })
      .finally(end => {
        res.status(200).json({
          message: 'your transaction will processed'
        })
      })
  }
  static checkOutHistory(req, res, next) {
    const UserId = req.currentUser
    Transaction
      .findAll({where: {UserId, status:true}, include: Product, order: [['updatedAt', 'ASC']]})
      .then(data => {
        res.status(200).json({
          Transaction: data
        })
      })
      .catch(err => {
        return next(err)
      })
  }
  static deleteWishlist(req, res, next) {
    const UserId = req.currentUser
    const id = req.params.id
    Transaction
      .destroy({where: {id}})
      .then(data => {
        res.status(200).json({
          message: 'Succes delete wishlist'
        })
      })
      .catch(err => {
        return next(err)
      })
  }
}

module.exports = ControllerTransaction