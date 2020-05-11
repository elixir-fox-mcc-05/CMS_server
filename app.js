if (process.env.NODE_ENV == 'development') {
    require('dotenv').config();
}
  
const express = require('express');
const app = express();
const router = require('./router');
const cors = require('cors');
const errHandler = require('./middlewares/errorHandler.js');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);
app.use(errHandler);

module.exports = app;