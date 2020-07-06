'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('ProductCarts', 'ProductId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Products',
        allowNull: false,
        key: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
      hooks: true
    })
    .then(() => {
      return queryInterface.addColumn('ProductCarts', 'CartId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Carts',
          allowNull: false,
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true
      })
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('ProductCarts', 'ProductId')
    .then(() => {
      return queryInterface.removeColumn('ProductCarts', 'CartId')
    })
  }
};
