'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {    
    return queryInterface.addConstraint('Transactions', ['Master_transactionId'], {
      type: 'foreign key',
      name: 'fkey_Master_transactions',
      references: { //Required field
        table: 'Master_transactions',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Transactions','fkey_Master_transactions');
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
