'use strict';

const { generatePassword } = require("../helpers/bcrypt");

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
   return queryInterface.bulkInsert('Users', [{
    name: 'Amir Faisal Z',
    email: "amir@gmail.com",
    role: "Super-admin",
    password: generatePassword("zxcvbn"),
    image_url: "https://b1.pngbarn.com/png/250/817/francisco-lachowski-smiling-man-wearing-white-crew-neck-shirt-png-clip-art.png",
    createdAt = new Date(),
    updatedAt = new Date()
  }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
