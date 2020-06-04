const Model = require('../models')
const Category = Model.Category
const Product = Model.Product


class CategoryControll {
    static findAll (req, res, next) {
        Category.findAll({
            include: { model: Product }
        }).then(result => {
            res.status(200).json({ Categories : result })
        }).catch(err => {
            next(err)
        })
    }

    static createCategory (req, res, next) {
        const { type } = req.body
        Category.create({
            type
        }).then(result => {
            res.status(201).json({
                category : result
            })
        }).catch(err => {
            next(err)
        })
    }

    static updateCategory (req, res, next) {
        const { type } = req.body
        const { id } = req.params
        Category.update({ type }, {
            where: { id },
            returning: true
        }).then(result => {
            res.status(201).json({ category : result })
        }).catch(err => { next(err) })
    }

    static deleteCategory (req, res, next) {
        const { id } = req.params
        Category.destroy({
            where: { id }
        }).then(result => {
            if(result){
                res.status(200).json({ message : `Category ${id} successfully deleted!` })
            }else{
                throw {
                    message : "Product cannot Found!",
                    code : 404
                }
            }
        }).catch(err => { next(err) })
    }
}

module.exports = CategoryControll;