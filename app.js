if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test') {
    require('dotenv').config();
}
  
const express = require('express');
const app = express();
const router = require('./router');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler.js');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);
app.use(errorHandler);

module.exports = app;