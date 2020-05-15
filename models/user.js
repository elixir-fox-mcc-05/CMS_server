'use strict';
const { generate_password } = require('../helpers/bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model { }

  User.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'first name required' }
      }
    },
    last_name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: `email should unique` },
      validate: {
        notNull: { msg: 'email required' },
        isEmail: { msg: 'invalid email' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'password required'
        },
        len: {
          args: [4,15],
          msg: 'invalid length password'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'customer',
    }
  },
  {
    hooks: {
      beforeCreate(user) {
        user.password = generate_password(user.password)
        user.role = (user.role).toLowerCase()
        if (user.last_name == '') { user.last_name = user.first_name }
      }
    },
    sequelize,
    modelName: 'User'
  })
  User.associate = function(models) {
    User.belongsToMany(models.Product, { through: 'Carts' })
  };
  return User;
};