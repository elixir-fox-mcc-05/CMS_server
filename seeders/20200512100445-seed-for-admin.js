'use strict';
const { generatePassword } = require('../helpers/bcrypt.js')

const Admin = require('../admin.json').map(admin => {
  admin.createdAt = new Date()
  admin.updatedAt = new Date()
  admin.password = generatePassword(admin.password)
  return admin
})
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Users', Admin, {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Users', null, {})
  }
};
