'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const p1 =  queryInterface.addColumn('Carts', 'UserId', {
      type: Sequelize.INTEGER,
      foreignKey : true,
      references: {
        model: "Users",
        key: "id"
      },
      onUpdate: "cascade",
      onDelete: 'cascade'
    })
  
      const p2 = queryInterface.addColumn('Carts', 'ProductId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      })
  
      return Promise.all([p1,p2])
  },

  down: (queryInterface, Sequelize) => {
    const p1 = queryInterface.removeColumn('Carts', 'UserId');

    const p2 = queryInterface.removeColumn('Carts', 'ProductId');

    return Promise.all([p1,p2])
  }
};
