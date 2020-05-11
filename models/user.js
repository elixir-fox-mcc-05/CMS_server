'use strict';
const { encrypt } = require('../helpers/bcrypt.js');

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class User extends Model {}

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: `Email Already Exists`
        },
        validate: {
          notNull: {
            msg: `Email is required`
          },
          isEmail: {
            msg: `Must Be an email`
          },
          notEmpty: {
            msg: `Email cannot empty`
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Password is required`
          },
          notEmpty: {
            msg: `Password cannot empty`
          },
          len: {
            args: [6],
            msg: `Password at least 6 characters`
          }
        }
      },
      role: {
        type: DataTypes.ENUM('member', 'admin'),
        defaultValue: 'member',
        validate: {
          isIn: {
            args: [['admin', 'member']],
            msg: "Status must be either 'member' or 'admin' "
          }
        }
      }
    },
    {
      hooks: {
        beforeCreate(user) {
          user.password = encrypt(user.password);
        }
      },
      sequelize
    }
  );

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Product);
  };
  return User;
};
