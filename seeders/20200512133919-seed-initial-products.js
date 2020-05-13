'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        name: 'Zyrtec',
        price: 56000,
        stock: 10,
        expiry: '2021-01-01',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Zyrtec-B',
        price: 56000,
        stock: 10,
        expiry: '2021-02-01',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Enervon-C',
        price: 35000,
        stock: 25,
        expiry: '2020-12-01',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products')
  }
};
