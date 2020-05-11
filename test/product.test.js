const app  = require('../app.js')
const request = require('supertest')

const { User, sequelize } = require('../models')
const { queryInterface } = sequelize