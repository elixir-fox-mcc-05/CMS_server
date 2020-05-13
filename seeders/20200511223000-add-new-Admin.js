'use strict';
const {generatePassword} = require("../helpers/bcrypt");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [{
      name : "test",
      email : "yodji@gmail.com",
      password : "$2a$15$qfZE3BWVPG7j54fdoqueY.rdd3O9AmGsmsja/Y6hhKghPUtK9PEyG",
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