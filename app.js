if (process.env.NODE_ENV && (process.env.NODE_ENV.trim() === 'development' || process.env.NODE_ENV.trim() === 'test')) {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const router = require('./routers');
const { errHandler } = require('./middlewares/errHandler.js');
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);
app.use(errHandler);

module.exports = app;
