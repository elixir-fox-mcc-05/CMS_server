'use strict'

const {encrypt} = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Email required`
        },
        isEmail: {
          args: true,
          msg: `Must be an email`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        len: [6, 25]
      }
    },
  },  {
    hooks: {
      beforeCreate(user) {
        user.password = encrypt(user.password);
      }
    },  sequelize, modelName: "User"
  });

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};