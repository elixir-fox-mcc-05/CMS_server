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
    name : `Admin`,
    email: 'testadmin@mail.com',
    password: `$2a$10$IVLoBs6YWCjXy80qO3VR8O3uLiZHSFbD9hcPlMqW1QRbe5QIgxgLS`,
    role : `admin`,
    createdAt : new Date(),
    updatedAt : new Date()
  },{
    name : `Merchant`,
    email: 'testmerchant@mail.com',
    password: `$2a$10$IVLoBs6YWCjXy80qO3VR8O3uLiZHSFbD9hcPlMqW1QRbe5QIgxgLS`,
    role : `merchant`,
    createdAt : new Date(),
    updatedAt : new Date()
  },{
    name : `Customer`,
    email: 'testcustomer@mail.com',
    password: `$2a$10$IVLoBs6YWCjXy80qO3VR8O3uLiZHSFbD9hcPlMqW1QRbe5QIgxgLS`,
    role : `customer`,
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
   return queryInterface.bulkDelete('Users', null, {});
  }
};
