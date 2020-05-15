'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    let data = []
    let user = require('../file_json/user.json')
    user.forEach(element => {
      element.createdAt = new Date();
      element.updatedAt = new Date();
      data.push(element)
    });
    // console.log(data)
    return queryInterface.bulkInsert('Users',data, {})
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Users', null , {})
  }
};
