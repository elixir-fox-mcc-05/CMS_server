'use strict';
module.exports = (sequelize, DataTypes) => {
  let Model = sequelize.Sequelize.Model

  class Order extends Model {}

  Order.init({
    user_id: DataTypes.INTEGER,
    items: DataTypes.STRING,
    quantity: DataTypes.STRING,
    price: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    hooks: {
      beforeCreate (order) {
        order.status = 'process'
      }
    }
  })
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};