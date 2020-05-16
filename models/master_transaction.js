'use strict';
module.exports = (sequelize, DataTypes) => {

  class Master_transaction extends sequelize.Sequelize.Model{}

  Master_transaction.init({
    number_trans :{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          args:true,
          msg : "number_trans required"
        }
      }
    }, 
    total_price:{
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          args:true,
          msg:"total_price required"
        }
      }
    },
    trasaction_date:{
      type: DataTypes.DATE,
      allowNull:false,
      validate:{
        notNull:{
          args:true,
          msg:"Transaction Date required"
        }
      }
    }  
  },{
    sequelize,
    modelName:"Master_transaction",
    hooks:{
      beforeCreate(user, opt) {
      user.trasaction_date = new Date()    
      }
    }
  })


  Master_transaction.associate = function(models) {
    Master_transaction.hasMany(models.Trans)
    // associations can be defined here
  };
  return Master_transaction;
};