'use strict';

const fs = require('fs');

const categories = JSON.parse(fs.readFileSync('./data/category.json', 'utf8'));

categories.forEach(element => {
  element["createdAt"] = new Date();
  element["updatedAt"] = new Date();
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', categories, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};