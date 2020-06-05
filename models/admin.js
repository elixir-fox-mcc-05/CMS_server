'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  const { generatePassword } = require('../helpers/bcrypt')

  class Admin extends Model {}

  Admin.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: 'Email required.'
        },
        isEmail: {
          args: true,
          msg: "Must be an email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password Required.'
        },
        len: {
          args: [4, 18],
          msg: 'Password length must between 4 or 18 Characters.'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(Admin, options) {
        Admin.password = generatePassword(Admin.password)
      }
    },
    sequelize
  });
  Admin.associate = function(models) {
    // associations can be defined here
  };
  return Admin;
};