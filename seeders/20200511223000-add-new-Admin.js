'use strict';
const {generatePassword} = require("../helpers/bcrypt");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [{
      name : "test",
      email : "test@gmail.com",
      password : generatePassword("testtest"),
      RoleId : 2,
      createdAt : new Date(),
      updatedAt : new Date()
    }];
    return queryInterface.bulkInsert("Users", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};