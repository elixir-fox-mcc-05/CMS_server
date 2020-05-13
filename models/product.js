'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class Product extends Model {};

  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: `Product already exist`
      },
      validate: {
        notEmpty: {
          args: true,
          msg: `Name must be filled`
        },
        len: {
          args: [1, 60],
          msg: `Name must be 1-60 characters long `
        }
      }
    },
    description: {
      type:DataTypes.TEXT,
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 
        {
          args: [0],
          msg: `Price must be equal to or more than 0`
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: `Stock must be equal to or more than 0`
        }
      }
    }
  },{
    sequelize,
    modelName: 'Product',
    hooks: {
      beforeCreate(product) {
        if(!product.description){
          product.description = `No description`
        }
        if(!product.image_url.length){
          product.image_url = `No image available`
        }
      },
      beforeUpdate(product) {
        if(!product.description){
          product.description = `No description`
        }
        if(!product.image_url.length){
          product.image_url = `No image available`
        }
      },
    }
  })

  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};