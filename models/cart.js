'use strict';
module.exports = (sequelize, DataTypes) => {
  let {Model} = sequelize.Sequelize
  class Cart extends Model {}
  Cart.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    demand: DataTypes.INTEGER,
    subTotal: DataTypes.INTEGER,
    cour: DataTypes.INTEGER,
    payed: DataTypes.BOOLEAN,
    select: DataTypes.BOOLEAN,
    idCart: DataTypes.INTEGER
  }, {
    sequelize,
    hooks: {
      beforeCreate(cart) {
          cart.select = true
          cart.payed = false
          cart.demand = 0
          cart.subTotal = 0
      }
    }
  });
  Cart.associate = function(models) {
    Cart.belongsTo(models.User)
    Cart.belongsTo(models.Product)
  };
  return Cart;
};