'use strict';
const Helper = require('../helper/helper')
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class User extends Model { }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {args: true, msg: 'Name Cannot Null'},
        notEmpty : {args: true, msg: 'Name Cannot be Empty'}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { args: true, msg: 'Invalid Email Addres' },
        notNull: { args: true, msg: 'Email Cannot Empty' },
        notEmpty: {args : true, msg: 'Email Cannot be Blank' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Password Cannot Null' },
        len: { args: [3, 10], msg: 'Password Length should be 3-10 Character' },
        notEmpty: {ergs: true, msg:'Please Insert your password'}
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Role Cannot Null' }
      }
    }
  }, {
    sequelize,
    hooks:
    {
      beforeCreate(user) {
        user.password = Helper.hashPassword(user.password)
      }
    }
  })

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Product)
  };
  return User;
};