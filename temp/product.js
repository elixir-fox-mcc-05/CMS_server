'use strict';
module.exports = (sequelize, DataTypes) => {
  class Product extends sequelize.Sequelize.Model{}
  Product.init({    
  name:{
    type: DataTypes.STRING,
    allowNull:false,
    validate:{
      notNull:{
        args:true,
        msg:"Name require"
      }
    }

  },
    image_url:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          args:true,
          msg:"Images require"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          args:true,
          msg:"Price require"
        }
      }
    },
    stock:{
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          args:true,
          msg:"stock require"
        }
      }
    } 
  },{
    sequelize,
    modelName:"Product"
  })
    
  Product.associate = function(models) {
    // associations can be defined here
    Product.hasMany(models.Transaction)
    Product.belongsToMany(models.Customer_detail,{ through: models.Transaction})
  };
  return Product;
};