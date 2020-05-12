'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Product extends Model{}

  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'please fill this field'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          args: true,
          msg: `please use url format`
        },
        notEmpty: {
          args: true,
          msg: 'please fill this field'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          msg: 'please input number format'
        },
        notEmpty: {
          args: true,
          msg: 'please fill this field'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          msg: 'please input number format'
        },
        notEmpty: {
          args: true,
          msg: 'please fill this field'
        }
      } 
    },    
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product'
  });
  Product.associate = function(models) {
    Product.belongsTo(models.User)
  };
  return Product;
};