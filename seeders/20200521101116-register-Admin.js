'use strict';
const { encrypt } = require('../helpers/bcrypt')
const admin = [
    {
    email: 'admin@mail.com',
    password: encrypt('admin12345'),
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'madzka@gmail.com',
    password: encrypt('12345'),
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Users', admin)
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Users')
  }
};
