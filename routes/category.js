let categoryRoutes = require('express').Router()
let CategoryCon = require('../controllers/category.js')

categoryRoutes.get('/',CategoryCon.show)
categoryRoutes.post('/',CategoryCon.add)
categoryRoutes.patch('/:id',CategoryCon.update)
categoryRoutes.delete('/:id',CategoryCon.delete)


module.exports = categoryRoutes