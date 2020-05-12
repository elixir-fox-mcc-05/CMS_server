'use strict';
const {encrypt} = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {

  class User extends sequelize.Sequelize.Model { }

  User.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull : false,
      validate: {
        notEmpty: {args : true, msg : 'Name is required field'},
        len: { args: [3], msg: 'first name must more than 3 letters' }
        
      }
    },
    last_name: DataTypes.STRING,
    email: {
      type : DataTypes.STRING, 
      unique : {args : true, msg : 'email already used'},
      validate : {
        isEmail : {args : true, msg : `email must with '@' and '.' `}
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
          len : {args: [6], msg : "password minimal is 6 length"}
      }
    },
    roles: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user) => {
        if (user.last_name == null) {
          user.last_name = user.first_name
        }
        let cryptPassword = encrypt(user.password)
        user.password = cryptPassword
      },
    }
  });
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};