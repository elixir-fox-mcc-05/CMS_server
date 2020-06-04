'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Cart extends Model{}
  
  Cart.init({
    total_price: DataTypes.INTEGER,
    status: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart'
  });
  Cart.associate = function(models) {
    Cart.belongsTo(models.User)
    Cart.belongsTo(models.Product)
  };
  return Cart;
};