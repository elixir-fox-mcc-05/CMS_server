if (process.env.NODE_ENV !== 'development' || process.env.NODE_ENV !== 'test') {
    require('dotenv').config();
}

// Initiate Express Dependency
const express = require('express');
const app = express();

// Initiate Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Initiate Cors
const cors = require('cors');
app.use(cors());

// Declare Routes
const routes = require('./routes/index.js');
const errHandler = require('./middlewares/errorHandler.js');
app.use('/', routes);
app.use(errHandler);

module.exports = app;