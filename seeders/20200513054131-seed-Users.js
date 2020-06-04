'use strict';
let { encryptPassword } = require('../helpers/bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Wahyu Raharjo',
        email: 'wahyuraharjo@contoh.com',
        password: encryptPassword('123456'),
        role: 'Administrator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Citra Nur',
        email: 'citranur@contoh.com',
        password: encryptPassword('123456'),
        role: 'Administrator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mahmud Rahman',
        email: 'mahmudrahman@contoh.com',
        password: encryptPassword('123456'),
        role: 'Staff',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Utari Ibrahim',
        email: 'utariibrahim@contoh.com',
        password: encryptPassword('123456'),
        role: 'Staff',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nyoman Suharto',
        email: 'nyomansuharto@contoh.com',
        password: encryptPassword('123456'),
        role: 'Staff',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
