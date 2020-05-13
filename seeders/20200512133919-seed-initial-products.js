'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        name: 'Zyrtec',
        price: 56000,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Enervon-C',
        price: 35000,
        stock: 25,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products')
  }
};
