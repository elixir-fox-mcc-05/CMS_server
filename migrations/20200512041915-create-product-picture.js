'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ProductPictures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      filename: {
        type: Sequelize.STRING
      },
      UserId: {
        type: Sequelize.INTEGER,
        references : {
          model : `Users`,
          id : `id`
        },
        onUpdate : `cascade`,
        onDelete : `cascade`
      },
      ProductId: {
        type: Sequelize.INTEGER,
        references : {
          model : `Products`,
          id : `id`
        },
        onUpdate : `cascade`,
        onDelete : `cascade`
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
    return queryInterface.dropTable('ProductPictures');
  }
};