const app = require('../app')
const http = require('http')
const PORT = process.env.PORT || 3000

const server = http.createServer(app)
const io = require('socket.io')(server)
const { Product } = require('../models')

server.listen(PORT, () => {
  console.log(`PORT : ${PORT}`)
})