'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

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
    total: {
      type: DataTypes.INTEGER
    },
    notes: DataTypes.STRING
  }, {
    sequelize
  });

  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.User);
    Cart.belongsTo(models.Product);
  };
  return Cart;
};