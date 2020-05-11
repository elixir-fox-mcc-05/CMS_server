'use strict';
const {generatePassword} = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model{}
  User.init({
    name: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : true,
      }
    },
    email: {
      type : DataTypes.STRING,
      unique : true,
      validate : {
        notEmpty : true,
        isEmail : true,
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : true,
        len : [8, 30]
      }
    },
    RoleId: {
      type : DataTypes.INTEGER,
      references : {
        model : "Roles",
        key : "id"
      },
      onDelete : "cascade",
      onUpdate : "cascade"
    }
  }, {
    sequelize,
    hooks : {
      beforeCreate : (user) => {
        user.password = generatePassword(user.password);
        user.RoleId = 1;
      }
    },
    modelName : "User"
  });
  User.associate = function(models) {
    User.hasOne(models.Role);
  };
  return User;
};