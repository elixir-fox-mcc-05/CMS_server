'use strict'

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Product extends Model {}

  Product.init({    
  name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Product name is required'
        },
        notEmpty: {
          msg: 'Product name cannot be empty'
        }
      }
  },
    img_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: {
          args: true,
          msg: 'Not URL format'
        },
        notEmpty: {
          args: true,
          msg: 'Product image cannot be empty'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          args: true,
          msg: 'Please input using number format'
        },
        notEmpty: {
          args: true,
          msg: 'Product price cannot be empty'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          args: true,
          msg: 'Please input using number format'
        },
        notEmpty: {
          args: true,
          msg: 'Product stock cannot be empty'
        }
      }
    },
  },{
    sequelize, modelName:"Product"
  })

  Product.associate = function(models) {
    Product.belongsTo(models.User)
  };
  return Product;
}; 