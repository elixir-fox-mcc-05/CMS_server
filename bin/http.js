const app = require(`../app`)
const port = process.env.PORT || 3000

app.listen(port, _=> { console.log(`${port} monument of men ready`)})