'use strict';
const { generateHash } = require('../helpers/bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class User extends Model {}

  User.init(
    {
      role: {
        type: DataTypes.STRING,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            args: true,
            msg: 'Please insert name',
          },
          notEmpty: {
            args: true,
            msg: 'Please insert name',
          },
          len: {
            args: [3, 15],
            msg: 'Name at least 3 characters, max 15',
          },
        },
      },
      email: {
        allowNull: false,
        unique: {
          args: true,
          msg: 'Email already in use',
        },
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: 'Please insert correct email format',
          },
          notNull: {
            args: true,
            msg: 'Please insert email',
          },
          notEmpty: {
            args: true,
            msg: 'Please insert email',
          },
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            args: true,
            msg: 'Please insert password',
          },
          notEmpty: {
            args: true,
            msg: 'Please insert password',
          },
          len: {
            args: [3, 15],
            msg: 'Password at least 3 characters, max 15',
          },
        },
      },
    },
    {
      sequelize,
      hooks: {
        beforeCreate: (User) => {
          User.password = generateHash(User.password);
          if (User.email === 'admin@admin.admin') {
            User.role = 'admin';
          }
        },
      },
    }
  );

  User.associate = function (models) {
    User.hasMany(models.Product);
    User.hasMany(models.Cart);
  };
  return User;
};
