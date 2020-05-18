let { NODE_ENV } = process.env
if (NODE_ENV == 'development' || NODE_ENV == 'test') {
    require('dotenv').config()
}

// App
const express = require('express')
const app = express()
const router = require('./routers/index.js')
const cors = require('cors')
const handler = require('./middlewares/errorHandler.js')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => res.json({ msg: 'H8DrugStore server is running'}))
app.use(router)
app.use(handler)

// Server
const http = require('http')
const PORT = process.env.PORT || 7438
const server = http.createServer(app)


server.listen(PORT, _=> {
    console.log(`Stephanie Poetri - I love you ${PORT}`);
})


module.exports = app
