'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Users', [{
    name : `Test`,
    email: 'test@mail.com',
    password: `$2a$10$IVLoBs6YWCjXy80qO3VR8O3uLiZHSFbD9hcPlMqW1QRbe5QIgxgLS`,
    role : `Admin`,
    createdAt : new Date(),
    updatedAt : new Date()
  }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('User', null, {});
  }
};
