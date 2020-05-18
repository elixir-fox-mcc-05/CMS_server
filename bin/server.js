const app = require('../app')
const http = require('http')
const PORT = process.env.PORT || 3000

const server = http.createServer(app)
const io = require('socket.io')(server)
const { Product } = require('../models')

io.on('connection', (socket)=>{
  console.log('A user Connected')

  socket.on('transaction', () => {
    console.log('A transaction has been completed')
    Product.findAll()
    .then(data => {
      io.emit('finish-transaction', data)
    })
  })

})

server.listen(PORT, () => {
  console.log(`PORT : ${PORT}`)
})