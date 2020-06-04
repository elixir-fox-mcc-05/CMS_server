'use strict';
module.exports = (sequelize, DataTypes) => {

  class Product extends sequelize.Sequelize.Model {}

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
        },
        len: {
          args: [3],
          msg: 'Name must include minimum 3 characters'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          args: true,
          msg: 'Please input correct url format for Image URL'
        }
      }
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
        },
        min: {
          args: [0],
          msg: 'Price can not have value below zero'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Stock is required'
        },
        notEmpty: {
          args: true,
          msg: 'Stock is required'
        },
        min: {
          args: [0],
          msg: 'Stock can not have value below zero'
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
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (product) => {
        if(!product.image_url) {
          product.image_url = "https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101065/112815953-stock-vector-no-image-available-icon-flat-vector.jpg?ver=6"
        }
      }
    }
  })
  
  Product.associate = function(models) {
    Product.belongsToMany(models.Cart, { through: "CartProducts" });
  };
  return Product;
};