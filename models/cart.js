'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Seqeulize.Model;

  class Cart extends Model {};

  Cart.init({
    UserId: DataTypes.INTEGER,
    ProductId: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [1],
          msg: 'Minimum purchase product is 1'
        }
      }
    },
    isPaid: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Cart'
  })

  Cart.associate = function(models) {
    Cart.belongsTo(models.Product, {foreignKey: 'ProductId'})
    Cart.belongsTo(models.User, {foreignKey: 'UserId'})
  };
  return Cart;
};