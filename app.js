require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./router')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use(router)

// app.listen (port, console.log('app is now listening : ', port))

module.exports = app


