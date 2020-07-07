'use strict';
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', 
    [ 
      {
        email: 'ottoyd',
        password: bcrypt.hashSync('ottoyd', salt),
        status: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'ottoyd02',
        password: bcrypt.hashSync('ottoyd02', salt),
        status: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  , {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
