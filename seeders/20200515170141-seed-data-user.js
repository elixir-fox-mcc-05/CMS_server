'use strict';
const userData = require('../rawData/rawUser.json');
const { hashPassword } = require('../helpers/bcrypt.js');

module.exports = {
  up: (queryInterface, Sequelize) => {
    userData.map(user => {
      user.createdAt = new Date();
      user.updatedAt = new Date();
      user.password = hashPassword(user.password);

      return user;
    })

    return queryInterface.bulkInsert('Users', userData, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
