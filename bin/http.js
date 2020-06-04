const app = require('../app.js');
const port = process.env.PORT || 3000;

// Listen to port
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});