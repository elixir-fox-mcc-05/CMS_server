if (process.env.NODE_ENV=="development" || process.env.NODE_ENV=="test") {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const router = require('./routes')
const cors = require('cors')

app.use(express.urlencoded({ extended : false }))
app.use(express.json())

app.use(cors())
app.use(router)

module.exports = app