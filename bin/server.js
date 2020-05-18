const http = require('http')
let { NODE_ENV } = process.env
if (NODE_ENV == 'development' || NODE_ENV == 'test') {
    require('dotenv').config()
}
require('dotenv').config()
const PORT = process.env.PORT || 7438
const app = require('../app')
const server = http.createServer(app)


server.listen(PORT, _=> {
    console.log(`Stephanie Poetri - I love you ${PORT}`);
})