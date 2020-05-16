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
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
