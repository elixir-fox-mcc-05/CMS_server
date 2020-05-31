'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  
  class ShoppingChart extends Model {}

  ShoppingChart.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: `Quantity can't be empty`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'ShoppingChart'
  })
  return ShoppingChart;
};