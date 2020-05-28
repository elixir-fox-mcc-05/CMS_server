'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Carts', [
      {
        CustomerId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CustomerId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CustomerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CustomerId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CustomerId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CustomerId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CustomerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CustomerId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CustomerId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CustomerId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CustomerId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Carts', null, {});
  }
};
