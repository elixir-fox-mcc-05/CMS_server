'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Trans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ProductId: {
        type: Sequelize.INTEGER,
        references:{
          model:"Products",
          key:"id"
        }
      },
      CustomerDetailId: {
        type: Sequelize.INTEGER,
        references:{
          model:"Customer_details",
          key:"id"
        }
      },
      MasterTransactionId: {
        type: Sequelize.INTEGER,
        references:{
          model:"Master_transactions",
          key:"id"
        }
      },
      price: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      payment_method: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Trans');
  }
};