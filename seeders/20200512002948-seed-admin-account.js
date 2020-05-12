'use strict';
const { generatePassword } = require('../helpers/bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
      const password = `admin`
      const hashPassword = generatePassword(password)

      return queryInterface.bulkInsert('Users', [{
        email: 'admin@gmail.com',
        password: hashPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
