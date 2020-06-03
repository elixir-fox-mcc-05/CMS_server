'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('CartProducts', [
      {
        CartId: 1,
        ProductId: 2,
        quantity: 1,
        status: 'Created',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CartId: 1,
        ProductId: 12,
        quantity: 1,
        status: 'Created',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CartId: 2,
        ProductId: 7,
        quantity: 1,
        status: 'Paid',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CartId: 2,
        ProductId: 9,
        quantity: 1,
        status: 'Paid',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CartId: 3,
        ProductId: 10,
        quantity: 1,
        status: 'Paid',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CartId: 3,
        ProductId: 11,
        quantity: 1,
        status: 'Paid',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CartId: 4,
        ProductId: 3,
        quantity: 1,
        status: 'On Process',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CartId: 4,
        ProductId: 1,
        quantity: 1,
        status: 'On Process',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CartId: 5,
        ProductId: 5,
        quantity: 1,
        status: 'Shipping',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CartId: 5,
        ProductId: 8,
        quantity: 1,
        status: 'Shipping',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CartId: 6,
        ProductId: 13,
        quantity: 1,
        status: 'Finish',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CartId: 7,
        ProductId: 2,
        quantity: 1,
        status: 'Finish',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CartId: 8,
        ProductId: 6,
        quantity: 1,
        status: 'Finish',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CartId: 9,
        ProductId: 9,
        quantity: 1,
        status: 'Finish',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CartId: 10,
        ProductId: 15,
        quantity: 1,
        status: 'Finish',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CartId: 11,
        ProductId: 1,
        quantity: 1,
        status: 'Finish',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CartProducts', null, {});
  }
};
