if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const cors = require('cors')
const routes = require('./routes/index');
const errHandler = require('./middlewares/errHandler');

app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(routes)
app.use(errHandler)

module.exports = app;