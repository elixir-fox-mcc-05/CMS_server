'use strict';
const { encryptPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {

  class Customer extends sequelize.Sequelize.Model {}

  Customer.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Name is required'
        },
        notEmpty: {
          args: true,
          msg: 'Name is required'
        },
        len: {
          args: [3],
          msg: 'Name must include minimum 3 characters'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Address is required'
        },
        notEmpty: {
          args: true,
          msg: 'Address is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate: {
        notNull: {
          args: true,
          msg: 'Email is required'
        },
        notEmpty: {
          args: true,
          msg: 'Email is required'
        },
        isEmail: {
          args: true,
          msg: 'Please input email with correct format'
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Phone is required'
        },
        notEmpty: {
          args: true,
          msg: 'Phone is required'
        },
        len: {
          args: [7, 15],
          msg: 'Phone must include at least 7 digits and maximum 15 digits'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password is required'
        },
        notEmpty: {
          args: true,
          msg: 'Password is required'
        },
        len: {
          args: [6],
          msg: 'Password must include minimum 6 characters'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (customer) => {
        customer.password = encryptPassword(customer.password)
      }
    }
  })

  Customer.associate = function(models) {
    Customer.hasMany(models.Cart, { foreignKey: "CustomerId", targetKey: "id" })
  };
  return Customer;
};