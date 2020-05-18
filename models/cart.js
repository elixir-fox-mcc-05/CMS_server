'use strict';
module.exports = (sequelize, DataTypes) => {

  class Cart extends sequelize.Sequelize.Model{}

  Cart.init({
    quantity: {
      type: DataTypes.INTEGER
    },
    isPaid: {type : DataTypes.BOOLEAN},
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName : 'Cart'
  });
  Cart.associate = function(models) {
    Cart.belongsTo(models.Product)
    Cart.belongsTo(models.User)
  };
  return Cart;
};