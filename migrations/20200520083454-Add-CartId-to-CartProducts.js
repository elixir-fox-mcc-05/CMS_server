'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("CartProducts", "CartId", { 
      type: Sequelize.INTEGER,
      references: {
        model: "Carts",
        key: "id"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("CartProducts", "CartId");
  }
};
