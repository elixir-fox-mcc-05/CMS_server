'use strict';
const {passwordGenerate} = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class User extends Model{}

  User.init({
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'email is already exists'
      },  
      validate: {
        isEmail: {
          args: true,
          msg: 'not an email type'
        },
        notEmpty: {
          args: true,
          msg: 'email is required'
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'password is required'
        },
        len: {
          args: [6,25],
          msg: `password length must between 6 and 25`
        }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password = passwordGenerate(user.password)
      }
    },
    sequelize,
    modelName: 'User'
  });
  User.associate = function(models) {
    User.hasMany(models.Product)
  };
  return User;
};