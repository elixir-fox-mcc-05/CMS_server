'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', 
    [ 
      {
        email: 'ottoyd',
        password: 'ottoyd',
        status: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'ottoyd02',
        password: 'ottoyd02',
        status: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  , {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
