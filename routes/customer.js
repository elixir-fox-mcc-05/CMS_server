let customerRoutes = require('express').Router()
let CustomerCon = require('../controllers/customer')
let authentication = require ('../middelwares/authentication.js')

customerRoutes.post('/register',CustomerCon.register)
customerRoutes.post('/login',CustomerCon.login)
customerRoutes.use(authentication)
customerRoutes.post('/addPaymentAddress',CustomerCon.addPaymentAddres)
customerRoutes.get('/getPaymentAddress',CustomerCon.getPaymentAddress)
customerRoutes.post('/confirmPayment',CustomerCon.addOrder)
customerRoutes.get('/orders',CustomerCon.getOrders)

module.exports = customerRoutes