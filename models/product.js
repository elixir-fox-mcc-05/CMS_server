'use strict';
module.exports = (sequelize, DataTypes) => {
  class Product extends sequelize.Sequelize.Model{}
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Name is required'
        },
        notEmpty: {
          args: true,
          msg: 'Name is required'
        }
      } 
    },
    image_url: {
      type: DataTypes.STRING,
      defaultValue: 'https://stafsite.untad.ac.id/images/noimage.jpg' 
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Price is required'
        },
        notEmpty: {
          args: true,
          msg: 'Price is required'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Price is required'
        },
        notEmpty: {
          args: true,
          msg: 'Price is required'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Category is required'
        },
        notEmpty: {
          args: true,
          msg: 'Category is required'
        },
        isIn: {
          args: [['bag', 'shoes', 'wallet', 'skirt', 'dress', 'other']],
          msg: 'Category is not valid'
        }
      }
    } 
  }, {
    sequelize,
    modelName: 'Product',
    validate: {
      notNegative(){
        if(this.price < 0 || this.stock < 0){
          throw new Error('Value should be greater than  0');
        }
      }
    }
  })
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};