'use strict';

const { hashPassword } = require('../helpers/bcrypt.js');

module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize;

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
      unique: {
        args: true,
        msg: 'email already exist'
      },
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
  }, {
    sequelize,
    modelName: 'Customer',
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    },
    hooks: {
      beforeCreate(customer) {
        customer.password = hashPassword(customer.password);
      },
      afterCreate(customer) {
        const { models } = sequelize;
        return models.Cart
          .create({
            CustomerId: customer.id
          })
          .then(cart => {
            // console.log(cart);
          })
          .catch(err => {
            throw(err);
          })
      }
    }
  });
  Customer.associate = function(models) {
    Customer.hasOne(models.Cart)
  };
  return Customer;
};