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
        len: {
          args: [3, 40],
          msg: 'Name must include between 3 and 40 characters'
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
        len: {
          args: [6, 20],
          msg: 'Password must include between 6 and 20 characters'
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