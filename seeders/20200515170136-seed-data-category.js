'use strict';
const categories = require('../rawData/rawCategory.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    categories.map(category => {
      delete category.id;
      category.createdAt = new Date();
      category.updatedAt = new Date();

      return category;
    })

    return queryInterface.bulkInsert('Categories', categories, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});

  }
};
