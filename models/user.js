'use strict'

const {encrypt} = require('../helpers/bcrypt.js')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class User extends Model {}

  User.init({
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Email is already exists'
      },
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid Email format'
        },
        notNull: {
          args: true,
          msg: 'Email is required'
        },
        notEmpty : {
          args: true,
          msg: 'Email is required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 25],
          msg: 'Password must be between 6 till 25'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'customer'
    } 
  }, {
    sequelize,
    hooks : {
      beforeCreate : (user) => {
        user.password = encrypt(user.password)
      }
    }
  })
  User.associate = function(models) {
    User.hasMany(models.Product)
  };
  return User;
};