const app = require('../app'); 
const port = process.env.PORT || 3000; // process.env.PORT ini kita tambahkan sebagai alternatif untuk proses deploy heroku

const http = require('http'); // Line 4 dan 5 ini dilakukan sebagai standard untuk mempermudah migrasi ke 'https'
const server = http.createServer(app);

server.listen(port, function() {
  console.log('Express running on port', port);
});