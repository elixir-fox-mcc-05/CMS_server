'use strict';
const {passwordGenerate} = require('../helpers/bcrypt')
const userData = require('../data/user.json')

module.exports = {
  up: (queryInterface, Sequelize) => {
    userData.map(user => {
      user.password = passwordGenerate(user.password)
      user.createdAt = new Date()
      user.updatedAt = new Date()

      return user
    })

    return queryInterface.bulkInsert('Users', userData, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
