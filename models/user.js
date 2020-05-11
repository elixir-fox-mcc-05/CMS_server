'use strict';
const { encryptPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {

  class User extends sequelize.Sequelize.Model{}

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Name is required'
        },
        min: {
          args: [3],
          msg: 'Name must include minimum 3 characters'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Role is required'
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate: {
        notNull: {
          args: true,
          msg: 'Email is required'
        },
        isEmail: {
          args: true,
          msg: 'Please input email with correct format '
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password is required'
        },
        min: {
          args: [6],
          msg: 'Password must include minimum 6 characters'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user) => {
        user.password = encryptPassword(user.password)
      }
    }
  })
  
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};