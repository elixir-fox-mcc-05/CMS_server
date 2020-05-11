'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      {name : "Sports"},
      {name : "House Items"},
      {name : "Electronics"},
      {name : "Clothes"},
      {name : "T-shirt"}
    ];
    return queryInterface.bulkInsert("Categories", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Categories", null, {});
  }
};
