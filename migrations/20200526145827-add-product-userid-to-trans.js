'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return queryInterface.addColumn('Transactions', 'ProductId', {
    type: Sequelize.INTEGER,
    references: {
      model: 'Products',
      key: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
  });

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return queryInterface.removeColumn('Transactions', 'ProductId');
  }
};
