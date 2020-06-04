'use strict';

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Cart extends Model {}

  Cart.init({ 
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'Cascade',
      onDelete: 'Cascade'
    },
    ProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'id'
      }
    },
    quantity: DataTypes.INTEGER
  }, {
    sequelize, modelName: 'Cart'
  });
  Cart.associate = function(models) {
    Cart.belongsTo(models.User);
    Cart.belongsTo(models.Product);
  };
  return Cart;
};