'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize;

  class Customer extends Model {}

  Customer.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "your name can\'t be empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "your email can\'t be empty"
        },
        isEmail: {
          msg: "invalid email format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'your password can\'t be empty'
        },
        len: {
          args: [8],
          msg: 'password must be at least 8 character long'
        },
        is: {
          args: /^\S+\S$/gi,
          msg: 'password can\'t contain any whitespace character'
        }
      }
    },
    street_address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'your street address can\'t be empty'
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'your city address can\'t be empty'
        }
      }
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'your zip codes can\'t be empty'
        },
        len: {
          args: [5],
          msg: 'invalid zip code format'
        },
        isInt: {
          msg: 'invalid zip code format'
        }
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'your phone number can\'t be empty'
        },
        is: {
          args: /^\+?\d{10}/gi,
          msg: 'Invalid phone number format'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Customer',
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    }
  });
  Customer.associate = function(models) {
    Customer.hasOne(models.Cart)
  };
  return Customer;
};