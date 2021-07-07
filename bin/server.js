let app = require('../app.js')
let port = process.env.PORT || 3000

app.listen(port,_=>{
    console.log('listen on port', port)
})