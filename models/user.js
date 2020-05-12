'use strict';
const { encryptPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model{}
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email already exists'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Input valid email'
        },
        notNull: {
          args: true,
          msg: 'Email is required'
        },
        notEmpty: {
          args: true,
          msg: 'Email is required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 10],
          msg: "Password must be 3-10 Characters"
        },
        notNull: {
          args: true,
          msg: "Password is required"
        },
        notEmpty: {
          args: true,
          msg: 'Password is required'
        }
      } 
    } ,
    role: {
      type: DataTypes.STRING,
      defaultValue: 'customer'
    } 
  }, {
    sequelize,
    modelName: 'User',
    hooks: { 
      beforeCreate(user, option){
        user.password = encryptPassword(user.password)
      }
    }
  })
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};