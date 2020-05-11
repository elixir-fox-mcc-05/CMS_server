'use strict';
const {Encrypt} = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
class Customer extends sequelize.Sequelize.Model{}

Customer.init({
  email :{
    type:DataTypes.STRING,
    allowNull:false,
    validate:{
      notNull:{
        args:true,
        msg : "Email required"
      }
    }
  }, 
  password:{
    type: DataTypes.STRING,
    allowNull:false,
    validate:{
      notNull:{
        args:true,
        msg:"Password required"
      }
    }
  } 
},{
  sequelize,
  modelName:"Customer",
  hooks:{
    beforeCreate(user, opt) {
    user.password = Encrypt(user.password)    
    }
  }
})
  Customer.associate = function(models) {
    // associations can be defined here
    Customer.hasMany(models.Customer_detail)
  };
  return Customer;
};