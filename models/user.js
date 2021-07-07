'use strict';
module.exports = (sequelize, DataTypes) => {
  let Model = sequelize.Sequelize.Model

  class User extends Model {}

  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize
  })
 
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};