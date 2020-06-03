const app = require('../app');
const PORT = process.env.PORT || 3000

app.listen(PORT, () =>{
    console.log(`E-Commerce CMS = listen to port:`, PORT)
})