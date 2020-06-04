'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("Carts", [ "CustomerId" ], {
      type: "foreign key",
      name: "custom_fkey_CustomerId",
      references: {
        table: "Customers",
        field: "id"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("Carts", "custom_fkey_CustomerId");
  }
};
