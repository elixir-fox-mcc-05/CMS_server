'use strict';
module.exports = (sequelize, DataTypes) => {
  class Trans extends sequelize.Sequelize.Model{}

  Trans.init({
    ProductId :{
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          args:true,
          msg : "Productid required"
        }
      }
    }, 
    CustomerDetailId :{
    type:DataTypes.INTEGER,
    allowNull:false,
    validate:{
      notNull:{
        args:true,
        msg : "detailid required"
      }
    }
  },
  MasterTransactionId :{
    type:DataTypes.INTEGER,
    allowNull:false,
    validate:{
      notNull:{
        args:true,
        msg : "Master_transaction Id required"
      }
    }
  },  
  price:{
    type: DataTypes.INTEGER,
    allowNull:false,
    validate:{
      notNull:{
        args:true,
        msg:"Price required"
      }
    }
  }, 
  status:{
    type: DataTypes.STRING,
    allowNull:false,
    validate:{
      notNull:{
        args:true,
        msg:"Status required"
      }
    }
  }, 
  payment_method:{
    type: DataTypes.STRING,
    allowNull:false,
    validate:{
      notNull:{
        args:true,
        msg:"payment Method required"
      }
    }
  }   
},{
  sequelize,
  modelName:"Trans"  
})
  Trans.associate = function(models) {
    Trans.belongsTo(models.Customer_detail)
    Trans.belongsTo(models.Product)
    Trans.belongsTo(models.Master_transaction)
    // associations can be defined here
  };
  return Trans;
};