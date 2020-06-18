'use strict';

const { encryptPassword } = require("../helpers/bcrypt.js")

module.exports = (sequelize, DataTypes) => {
  
  class User extends sequelize.Sequelize.Model {}

  User.init({
    // Model attributes are defined here
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        arg: true,
        msg: 'Please specify a different email'
      },
      validate :{
        // validasi model adalah validasi class user di javascript kamu, bukan di database kamu --> use allowNull
        // validasi migration adalah validasi database --> use notNull
        notNull:{
          arg: true,
          msg: 'Please specify an email'
        },
        notEmpty:{
          arg: true,
          msg: 'Please specify an email'
        },
        isEmail: {
          arg: true,
          msg: 'Please use a proper @ email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          arg: false,
          msg: 'Please specify a proper password'
        },
        notEmpty: {
          arg: false,
          msg: 'Please specify a proper password'
        },
        len: { 
          args: [4, 12],
          msg: "The password length should be between 4 and 12 characters."
       }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "User"
    }
  }, {
    hooks:{
      beforeCreate: (User,options) =>{
        User.password = encryptPassword(User.password)
      }
    },
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
  });

  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Product, {through: models.Cart})
  };
  return User;
};