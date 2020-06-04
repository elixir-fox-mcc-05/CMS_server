'use strict';
const { encrypt } = require('../helpers/bcrypt.js')
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model;

  class User extends Model {}

  User.init({
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: `Email already exist, please choose different email`
      },
      validate: {
        notEmpty: {
          args: true,
          msg: `Email can't be empty`
        },
        isEmail: {
          args: true,
          msg: `Email must be email format`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Password can't be empty`
        },
        len: {
          args: [6],
          msg: `Password minimum 6 characters`
        }
      }
    },
    role: {
      type:  DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Role can't be empty`
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user) => {
        user.password = encrypt(user.password)
      }
    },
    modelName: 'User'
  })

  User.associate = function(models) {
    User.belongsToMany(models.Product, { through: 'ShoppingChart' })
  };
  return User;
};