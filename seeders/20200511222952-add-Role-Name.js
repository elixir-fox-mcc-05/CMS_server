'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      {name : "user",
      createdAt : new Date(),
      updatedAt : new Date()},
      {name : "admin",
      createdAt : new Date(),
      updatedAt : new Date()}
    ];
    return queryInterface.bulkInsert("Roles", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Roles", null, {});
  }
};