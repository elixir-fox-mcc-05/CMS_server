'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      {name : "user"},
      {name : "admin"}
    ];
    return queryInterface.bulkInsert("Roles", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Roles", null, {});
  }
};