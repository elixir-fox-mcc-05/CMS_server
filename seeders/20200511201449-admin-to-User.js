'use strict';
const {generatePassword} = require("../helpers/bcrypt");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [{
      name : "Yodi",
      email : "yodji09@gmail.com",
      password : generatePassword("trafalgar9"),
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
