let app = require('../app')
let http = require('http')
let port = process.env.PORT || 3000

let server = http.createServer(app)

server.listen(port, ()=> {
    console.log('Tis on port',port);
})
