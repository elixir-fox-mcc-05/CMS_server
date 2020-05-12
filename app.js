if (process.env.NODE_ENV == 'development') {
    require('dotenv').config()
}
require('dotenv').config()
const express= require('express')
const app = express()
const routes = require('./routes')
const cors = require('cors')
const errorHandling = require('./middlewares/errorHandler')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use(routes)
app.use(errorHandling)

module.exports = app