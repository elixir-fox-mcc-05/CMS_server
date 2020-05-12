'use strict';
module.exports = (sequelize, DataTypes) => {

  class Product extends sequelize.Sequelize.Model{}

  Product.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {args : true, msg : 'Name is required field'}
      }
    },
    image_url: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {args : true, msg : 'image_url is required field'}
      }
    },
    price: {
      type : DataTypes.INTEGER,
      validate : {
        min : {args : 0, msg : `price can't below 0, are you nuts?`}
      }
    },
    stock: {
      type : DataTypes.INTEGER,
      validate : {
        min : {args : 0, msg : `stock can't below 0, are you nuts?`}
      }
    },
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName : 'Product'
  });
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};