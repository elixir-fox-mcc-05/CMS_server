'use strict';
const seed = require('./seed.js')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', seed)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products')
  }
};
