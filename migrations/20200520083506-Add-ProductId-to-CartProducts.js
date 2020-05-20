'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("CartProducts", "ProductId", { 
      type: Sequelize.INTEGER,
      references: {
        model: "Products",
        key: "id"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("CartProducts", "ProductId");
  }
};
