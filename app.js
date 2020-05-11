if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    require('dotenv').config()
}
const express = require('express')
const cors = require('cors')
const app = express()
const router = require('./router/index.js')
const error = require('./middleware/errorHandler.js')

app.use(cors())
app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(router)
app.use(error)


module.exports = app;