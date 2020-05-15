const {Category} = require('../models')

class CategoryController {
    static list(req,res){
        Category
            .findAll()
            .then(data => {
                res.status(200).json({data})
            })
            .catch(err => {
                res.status(400).json({
                    error : err.message
                })
            })
    }

    static add(req,res){
        let {name} = req.body

            Category
                .create({'name' : name})
                .then(data => {
                    res.status(200).json({
                        data
                    })
                })
                .catch(err => {
                    console.log(err.message)
                    res.status(400).json({
                        error: err.message
                    })
                })
    }

    static edit (req,res){
        let {name} = req.body

        Category
            .update({name},{where : {id : req.params.id}})
            .then(data => {
                return Category.findByPk(req.params.id)
            })
            .then(data => {
                res.status(200).json({
                    data
                })
            })
            .catch(err => {
                console.log(err.message)
                res.status(400).json({
                    error : err.message
                })
            })

    }

    static delete (req,res){
        Category
            .destroy({where : {id : req.params.id}})
            .then(data => {
                res.status(200).json({
                    error : 'delete completed'
                })
            })
            .catch(err => {
                res.status(400).json({
                    error : err.message
                })
            })
    }
}

module.exports = CategoryController