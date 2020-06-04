'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      {
        name : 'vege',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name : 'sleep',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name : 'tools',
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
