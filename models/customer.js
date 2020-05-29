'use strict';
let { hashPassword } = require ('../helpers/bcrypt.js')

module.exports = (sequelize, DataTypes) => {
  let Model = sequelize.Sequelize.Model

  class Customer extends Model {}

  Customer.init ({
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Email Has already exists'
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8,30],
          msg: 'Password must beetwen 8 to 30 character length '
        }
      }
    },
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    hooks: {
      beforeCreate (customer) {
        customer.status = false
        customer.password = hashPassword(customer.password)
      }
    }
  })
  
  Customer.associate = function(models) {
    // associations can be defined here
  };
  return Customer;
};