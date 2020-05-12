'use strict';
const { generate_password } = require('../helpers/bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class Administrator extends sequelize.Sequelize.Model { }

  Administrator.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        len: [4,15]
      }
    },
  },
  {
    sequelize,
    hooks: {
      beforeCreate(user) {
        user.password = generate_password(user.password)
      }
    },
    modelName: 'Administrator'
  })
  Administrator.associate = function(models) {
    // associations can be defined here
  };
  return Administrator;
};