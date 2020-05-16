'use strict';
module.exports = (sequelize, DataTypes) => {  
  class Customer_detail extends sequelize.Sequelize.Model{}

  Customer_detail.init({
    name :{
    type:DataTypes.STRING,
    allowNull:false,
    validate:{
      notNull:{
        args:true,
        msg : "Name required"
      }
    }
  }, 
  address:{
    type: DataTypes.STRING,
    allowNull:false,
    validate:{
      notNull:{
        args:true,
        msg:"Address required"
      }
    }
  },CustomerId :{
    type:DataTypes.INTEGER,
    allowNull:false,
    validate:{
      notNull:{
        args:true,
        msg : "CustomerId required"
      }
    }
  } 
},{
  sequelize,
  modelName:"Customer_detail"  
})

  Customer_detail.associate = function(models) {
    Customer_detail.belongsTo(models.Customer)
    Customer_detail.hasMany(models.Trans)
    // Customer_detail.belongsToMany(models.Product,{ through: models.Trans})
    // associations can be defined here
  };
  return Customer_detail;
};