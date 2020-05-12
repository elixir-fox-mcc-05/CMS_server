if(process.env.NODE_ENV == "development" || process.env.NODE_ENV == "test") {
    require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const error_handler = require('./middlewares/errorHandler')

const app = express()
// const PORT = process.env.PORT || 5000

app.use(express.urlencoded({ extended:false }))
app.use(express.json())
app.use(cors())

app.use(routes)
app.use(error_handler)

// app.listen(PORT, () => console.log(`run port`, PORT))
module.exports = app // bakalan di test menggunaka jest