let productRoutes = require('express').Router()
let ProductCon = require('../controllers/product.js')

productRoutes.get('/',ProductCon.show)
productRoutes.post('/',ProductCon.add)
productRoutes.patch('/:id',ProductCon.edit)
productRoutes.delete('/:id',ProductCon.delete)


module.exports = productRoutes