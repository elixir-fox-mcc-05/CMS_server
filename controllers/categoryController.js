const { Category,Product } = require('../models')

class CategoryController {
    static list(req, res) {
        Category
            .findAll({ order: [['id', 'ASC']] })
            .then(data => {
                res.status(200).json({ data })
            })
            .catch(err => {
                res.status(400).json({
                    error: err.message
                })
            })
    }

    static add(req, res) {
        let { name } = req.body

        Category
            .create({ 'name': name })
            .then(data => {
                res.status(201).json({
                    id: data.id,
                    name: data.name
                })
            })
            .catch(err => {
                let errorfix = err.message
                if (errorfix.includes(',')) {
                    errorfix = errorfix.split(',')
                    for (let i = 0; i < errorfix.length; i++) {
                        errorfix[i] = errorfix[i].replace('Validation error: ', '').replace('\n', '')
                        errorfix[i] = errorfix[i].replace('notNull Violation: ', '')
                        if (errorfix[i].charAt(errorfix[i].length - 1) == ' ') {
                            errorfix[i] = errorfix[i].slice(0, -1);
                        }
                    }

                } else {
                    errorfix = errorfix.replace('Validation error: ', '')
                    errorfix = errorfix.replace('notNull Violation: ', '')
                }
                res.status(400).json({
                    error: errorfix
                })
            })
    }

    static select(req, res) {
        Category
            .findOne({ where: { id: req.params.id } })
            .then(data => {
                res.status(200).json({
                    id: data.id,
                    name: data.name
                })
            })
            .catch(err => {
                res.status(404).json({
                    error: 'not found'
                })
            })
    }


    static edit(req, res) {
        console.log(req.body)
        let { name } = req.body

        if(name == null){
            res.status(400).json({
                error : 'name is null'
            })
        }else{
            Category
            .update({ 'name': name }, { where: { id: req.params.id } })
            .then(data => {
                // console.log(data)
                return Category.findByPk(req.params.id)
            })
            .then(data => {
                if(data)
                res.status(200).json({
                    id: data.id,
                    name: data.name
                })
            })
            .catch(err => {
                // console.log(err.message)
                let errorfix = err.message
                if (errorfix.includes(',')) {
                    errorfix = errorfix.split(',')
                    for (let i = 0; i < errorfix.length; i++) {
                        errorfix[i] = errorfix[i].replace('Validation error: ', '').replace('\n', '')
                        errorfix[i] = errorfix[i].replace('notNull Violation: ', '')
                        if (errorfix[i].charAt(errorfix[i].length - 1) == ' ') {
                            errorfix[i] = errorfix[i].slice(0, -1);
                        }
                    }

                } else {
                    errorfix = errorfix.replace('Validation error: ', '')
                    errorfix = errorfix.replace('notNull Violation: ', '')
                }
                res.status(400).json({
                    error: errorfix
                })
            })
        }
        

    }

    static delete(req, res) {
        Category
            .destroy({ where: { id: req.params.id } })
            .then(data => {
                res.status(200).json({
                    error: 'delete completed'
                })
            })
            .catch(err => {
                res.status(400).json({
                    error: err.message
                })
            })
    }
}

module.exports = CategoryController