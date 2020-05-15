'use strict';
module.exports = (sequelize, DataTypes) => {

  class Cart extends sequelize.Sequelize.Model { }

  Cart.init({
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'id'
      },
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true
      }
    },
  },
  {
    sequelize,
    modelName: 'Cart'
  })
  Cart.associate = function(models) {
    Cart.belongsTo(models.User)
    Cart.belongsTo(models.Product)
  };
  return Cart;
};