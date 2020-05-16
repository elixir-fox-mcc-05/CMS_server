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
  },CustomersId :{
    type:DataTypes.INTEGER,
    allowNull:false,
    validate:{
      notNull:{
        args:true,
        msg : "detailid required"
      }
    }
  } 
},{
  sequelize,
  modelName:"Customer_detail"  
})

  Customer_detail.associate = function(models) {
    Customer_detail.belongsTo(models.Customer)
    Customer_detail.hasMany(models.Transaction)
    Customer_detail.belongsToMany(models.Product,{ through: models.Transaction})
    // associations can be defined here
  };
  return Customer_detail;
};