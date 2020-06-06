'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class PaymentChannel extends Model {

  }

  PaymentChannel.init({
    bank_name: DataTypes.STRING,
    account_number: DataTypes.INTEGER
  }, {
    sequelize
  });

  PaymentChannel.associate = function(models) {
    // associations can be defined here
    PaymentChannel.hasMany(models.Order);
  };
  return PaymentChannel;
};