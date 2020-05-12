if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const router = require('./routes/index');
const errHandler = require('./middlewares/errHandler');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use(errHandler);

// app.listen(port, () => {
//   console.log(`Listening to port ${port}`);
// });

module.exports = app;
