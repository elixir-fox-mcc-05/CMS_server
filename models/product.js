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
      },
      notEmpty: true
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
        },
      min:0
      }
    },
    stock:{
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          args:true,
          msg:"stock require"
        },
      min:0
      }
    } 
  },{
    sequelize,
    modelName:"Product"
  })
    
  Product.associate = function(models) {
    // associations can be defined here
    // Product.belongsToMany(models.Customer_detail,{ through: models.Trans})
    Product.hasMany(models.Trans)
  };
  return Product;
};