
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./routers')
const error = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(router)
app.use(error)

module.exports = app