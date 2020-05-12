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
        unique: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      image_url: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING(999)
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER,
        min: 0
      },
      stock: {
        allowNull: false,
        type: Sequelize.INTEGER,
        min: 0
      },
      users: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
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