'use strict';
const { generatePassword } = require('../helpers/bcrypt.js')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class User extends Model {}

  User.init({
    email: {
      type : DataTypes.STRING,
      unique : {
        args : true,
        msg : 'Email is already exists'
      },
      allowNull : false,
      validate : {
        isEmail : {
          args : true,
          msg : 'Invalid Email Format'
        },
        notNull : {
          args : true,
          msg : 'email is required'
        },
        notEmpty : {
          args : true,
          msg : 'email is required'
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        len : {
          args : [5, 16],
          msg : 'Password must be 5 between 16'
        }
      }
    }
  }, {
    sequelize,
    hooks : {
      beforeCreate : (user) => {
        user.password = generatePassword(user.password)
      }
    }
  })
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};