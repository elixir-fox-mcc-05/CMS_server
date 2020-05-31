'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      {
        name : 'sayur',
        image_url : 'https://i.imgur.com/94hF532.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name : 'kasur',
        image_url : 'https://i.imgur.com/QYiJrI5.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name : 'spatula',
        image_url : 'https://i.imgur.com/UpSlF73.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ]

  return queryInterface.bulkInsert('Banners', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Banners', null, {});
  }
};
