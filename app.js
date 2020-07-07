if(process.env.NODE_ENV != 'production') {
    require('dotenv').config()
}
let express = require('express')
let app = express()
let cors = require('cors')
let routes = require('./routers/index')
let errHandle =  require('./middlewares/errHandle')

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(routes)
app.use(errHandle)

module.exports = app