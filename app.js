if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') require('dotenv').config()

const express = require('express')
const app = express()
const router = require('./routes/index')
const error = require('./middleware/errorHandler')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(router)
app.use(error)

module.exports = app