'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      {
        first_name : "user",
        last_name : "user",
        email : "user@user.com",
        password : "user",
        roles : "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name : "admin",
        last_name : "admin",
        email : "admin@admin.com",
        password : "admin",
        roles : "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name : "asd",
        last_name : "asd",
        email : "asd@asd.com",
        password : "123456",
        roles : "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ]

  return queryInterface.bulkInsert('Users', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
