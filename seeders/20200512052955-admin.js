'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkUpdate(
      'Users',
      {
        role: 'admin',
        updatedAt: new Date(),
      },
      {
        email: 'admin@admin.admin',
      },
      {},
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return;
  },
};
