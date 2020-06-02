"use strict";

const { generatePassword } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class User extends Model {}

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Name is required"
          },
        }
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Email already in use"
        },
        validate: {
          notEmpty: {
            args: true,
            msg: "Email is required"
          },
          isEmail: {
            args: true,
            msg: "Incorrect email format"
          }
        }
      },
      role: {
        type: DataTypes.ENUM("Super-admin", "Admin", "Member"),
        defaultValue: "Member",
        validate: {
          isIn: {
            args: [['Super-admin','Admin', 'Member']],
            msg: "Role must be either 'Super-admin', 'Admin' or 'Member'"
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Password is required"
          },
          len: {
            args: [5, 30]
          }
        }
      },
      image_url: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      hooks: {
        beforeCreate: (user) => {
          user.password = generatePassword(user.password);
        }
      }
    }
  );

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Product);
  };
  return User;
};
