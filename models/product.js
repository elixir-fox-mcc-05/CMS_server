'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model
  
  class Product extends Model {}

  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Name can't be empty`
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: `Price can't be empty`
        },
        min: {
          args: 1,
          msg: `Minimum price is 1`
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: `Stock can't be empty`
        },
        min: {
          args: 1,
          msg: `Minimum stock is 1`
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Category can't be empty`
        }
      }
    },
    image_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product'
  })

  Product.associate = function(models) {
    Product.belongsToMany(models.User, { through: 'ShoppingCharts'})
  };
  return Product;
};