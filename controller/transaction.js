const Model = require('../models')
const Transaction = Model.Transaction
const Product = Model.Product

class TransactionController {
    
    static addTransaction (req, res, next) {
        let UserId  = req.UserId
        const { total_price, ProductId } = req.body

        Transaction.create({ total_price, ProductId, UserId })
            .then(result => {
                res.status(200).json({ cart : result })
            })
            .catch(err => { return next(err) })
    }

    static getAll (req, res, next) {
        let UserId = req.UserId
        Transaction.findAll({ where : {UserId, status: 'pending'},
            include: { model: Product }
        })
        .then(data => {
            res.status(200).json({ cart : data })
        })
        .catch(err => {
            return next(err)
        })
    }

    static getHistory (req, res, next) {
        let UserId = req.UserId
        Transaction.findAll({ where : {UserId, status: 'Berhasil'},
            include: { model: Product }
        })
        .then(data => {
            res.status(200).json({ cart : data })
        })
        .catch(err => {
            return next(err)
        })
    }

    static deleteCart (req, res, next) {
        let { id } = req.params
        Transaction.destroy({where : {id}})
            .then(data => {
                if(data){
                    res.status(200).json({ message : `Cart ${id} successfully deleted!` })
                }else{
                    throw {
                        message : "Product cannot Found!",
                        code : 404
                    }
                }
            })
            .catch(err => {
                return next(err)
            })
    }
    static updateTransaction(req, res, next) {
        let { status } = req.body
        let { id } = req.params
        let updated = {
            status
        }
        let ProductId;

        Transaction.update( updated, { where : { id }, returning : true })  
            .then(result => {
                ProductId = result[1][0].ProductId
                return Product.decrement('stock', { by: 1, where: {id: ProductId} })
                // if(result) {
                //     console.log(result[1][0])
                //     console.log(result[1][0].ProductId, 'ini wadaw')
                //     res.status(201).json({ Cart : result })
                // }else{
                //     throw {
                //         message : "Product not Found!",
                //         code : 404
                //     }
                // }
            })
            .then(data => {
                // console.log(data[0][0][0])
                res.status(200).json({
                    Cart : data[0][0][0]
                })
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = TransactionController;