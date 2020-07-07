'use strict';
module.exports = (sequelize, DataTypes) => {
  const voucher = sequelize.define('voucher', {
    code: DataTypes.STRING,
    nominal: DataTypes.NUMBER
  }, {});
  voucher.associate = function(models) {
    // associations can be defined here
  };
  return voucher;
};