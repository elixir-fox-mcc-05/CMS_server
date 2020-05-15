'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      {
        name: 'a',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name : 'b',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name : 'c',
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ]

  return queryInterface.bulkInsert('Categories', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
