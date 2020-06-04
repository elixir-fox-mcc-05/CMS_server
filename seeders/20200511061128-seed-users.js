'use strict';

const { encrypt } = require('../helpers/bcrypt.js');
const fs = require('fs');

const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

users.forEach(element => {
  element.password = encrypt(element.password);
  element["createdAt"] = new Date();
  element["updatedAt"] = new Date();
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
