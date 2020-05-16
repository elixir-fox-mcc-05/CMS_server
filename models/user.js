'use strict';

const { generatePassword } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class User extends Model {}

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Name is required',
          },
          len: {
            args: [3],
            msg: 'Name must include minimum 3 characters',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Email is required',
          },
          isEmail: {
            args: true,
            msg: 'Incorrect email format',
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          notEmpty: {
            args: true,
            msg: 'Role is required'
          }
        }
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Password is required',
          },
          len: {
            args: [5],
            msg: 'Password must include minimum 5 characters',
          },
        },
      },
    },
    {
      sequelize,
      hooks: {
        beforeCreate: (user) => {
          user.password = generatePassword(user.password);
        },
      },
    }
  );

  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
