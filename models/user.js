'use strict';
const { plaintoHash } = require(`../helpers/bcrypt`)

module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model
  class User extends Model {}

  User.init({
    name: {
      type : DataTypes.STRING,
      validate : {
        len : {
          args : [4,255],
          msg : `Name should be at least 4 characters long`
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      unique : {
        msg : `Email is used, use login instead`
      },
      validate : {
        isEmail : {
          msg : `Re-check your email formatting`
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        len : {
          args : [4,12],
          msg : `Password should be between 4 to 12 characters`
        }
      }
    },
    role : {
      type : DataTypes.STRING,
      defaultValue : `customer`
    }
  }, {
    sequelize,
    modelName : `User`,
    hooks : {
      beforeValidate : ( data, options) => {
        if(!data.name || !data.email || !data.password){
          return Promise.reject(new Error("One or more of the field(s) is/are empty"));
        }
      },
      afterValidate : ( data, options) => {
        data.password = plaintoHash(data.password)
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.ProductPicture)
  };
  return User;
};