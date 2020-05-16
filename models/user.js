'use strict';
let {bcryptPass} = require('../helpers/bycrypt')
module.exports = (sequelize, DataTypes) => {
  let { Model } = sequelize.Sequelize
  class User extends Model {}
  User.init({
    email: {
      type : DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'Please Input Your Data Correctly'
          },
        },
        unique: {
          args: true,
          msg: 'Email Already Used'
        }
    },

    password: {
      type : DataTypes.STRING,
      allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'Please Input Your Data Correctly'
          },
          notEmpty: true,
          len: {
            args: [6],
            msg: 'Password is too Weak'
          }
        },
    },
    status: DataTypes.STRING,
  }, {
    sequelize,
    hooks: {
      beforeCreate(user) {
        user.password = bcryptPass(user.password)
        if (user.status == null) {
          user.status = 'user'
        }
      }
    }
  });
  User.associate = function(models) {
    User.belongsToMany(models.Product, { through: 'Cart' })
  };
  return User;
};