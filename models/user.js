'use strict';
const { generatePassword, generateAdminPassword } = require('../helpers/bcrypt.js')
module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {}

  User.init({
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Valid email address is required"
        }
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8],
          msg: "Password must be 8 characters or longer"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['admin', 'customer']],
          msg: "Please select the appropriate role"
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user) => {
        if (user.role === 'admin') {
          user.password = generateAdminPassword(user.password)
        } else if (user.role === 'customer') {
          user.password = generatePassword(user.password)
        }        
        if (!user.name) user.name = user.email
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
