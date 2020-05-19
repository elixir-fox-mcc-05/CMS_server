'use strict';
module.exports = (sequelize, DataTypes) => {
  let Model = sequelize.Sequelize.Model

  class Product extends Model {}

  Product.init({
    name: {
      type : DataTypes.STRING,
      unique : {
        args : true,
        msg : 'Product name already exists'
      }
    },  
    description: {
      type : DataTypes.STRING,
    },
    imgUrl: DataTypes.STRING,
    price: {
      type : DataTypes.INTEGER,
    },
    stock: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  },{
    sequelize,
    hooks : {
      beforeCreate(product) {
        if(!product.category_id) {
          product.category_id = -1
        }
      }
    }
  })


  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};