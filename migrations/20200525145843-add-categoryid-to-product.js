'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return queryInterface.addColumn('Products', 'CategoryId', {
     type: Sequelize.INTEGER,
     references: {
       model: 'Categories',
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
   return queryInterface.removeColumn('Products', 'CategoryId');
  }
};
