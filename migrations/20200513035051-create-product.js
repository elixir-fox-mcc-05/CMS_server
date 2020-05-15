'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull : false,
        type: Sequelize.STRING,
        unique : true,
      },
      description: {
        allowNull : false,
        type: Sequelize.STRING
      },
      imgUrl: {
        allowNull : false,
        type: Sequelize.STRING
      },
      price: {
        allowNull : false,
        type: Sequelize.INTEGER
      },
      stock: {
        allowNull : false,
        type: Sequelize.INTEGER
      },
      category_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Products');
  }
};