'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model;
  class Product extends Model {}

  Product.init({
    name: {
      type : DataTypes.STRING
    },
    price: {
      type : DataTypes.INTEGER,
      validate : {
        min : {
          args : 1,
          msg : `A price for an item cannot be below 1`
        }
      }
    },
    stock: {
      type : DataTypes.INTEGER,
      validate : {
        min : {
          args : 0,
          msg : `A stock for an item cannot be below 0`
        }
      }
    },
    CategoryId : {
      type : DataTypes.INTEGER
    },
    UserId : {
      type : DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName : `Product`,
    hooks : {
      beforeValidate (data, options) {
        if(data.price < 1) {
          return Promise.reject(new Error("A price for an item cannot be below 0 or lower"));
        };
        if(data.price < 0) {
          return Promise.reject(new Error("A stock for an item cannot be below 0"));
        };
      }
    }
  })

  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.Category)
    Product.hasMany(models.ProductPicture)
  };
  return Product;
};