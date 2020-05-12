'use strict';
const { hashPassword } = require('../helpers/bcrypt.js');

module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize;

  class User extends Model {}

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "name can\'t be empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'email already exists'
      },
      validate: {
        notEmpty: {
          msg: "email can\'t be empty"
        },
        isEmail: {
          msg: "invalid email format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "password can\'t be empty"
        },
        len: {
          args: [8],
          msg: 'password must be at least 8 character long'
        },
        is: {
          args: /^\S+\S$/gi,
          msg: 'password can\'t contain any whitespace character'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'admin'
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    },
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password);
      }
    }
  });
  
  User.associate = function(models) {
    User.hasMany(models.Product);
  };
  return User;
};
