'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      {name : "Sports",
      createdAt : new Date(),
      updatedAt : new Date()
    },
      {name : "House Items",
      createdAt : new Date(),
      updatedAt : new Date()
    },
      {name : "Electronics",
      createdAt : new Date(),
      updatedAt : new Date()
    },
      {name : "Clothes",
      createdAt : new Date(),
      updatedAt : new Date()
    },
      {name : "T-shirt",
      createdAt : new Date(),
      updatedAt : new Date()
    }
    ];
    return queryInterface.bulkInsert("Categories", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Categories", null, {});
  }
};
