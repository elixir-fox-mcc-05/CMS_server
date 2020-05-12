'use strict';
module.exports = (sequelize, DataTypes) => {

  class Product extends sequelize.Sequelize.Model { }

  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { args: true, msg: 'name already used' },
      validate: {
        notNull: {args: true, msg: 'Name is required field' },
        notEmpty: { args: true, msg: 'Name is required field' },
        len: { args: [3], msg: 'Name must more than 3 letters' }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {args: true, msg: 'image_url is required field' },
        notEmpty: { args: true, msg: 'image_url is required field' }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {args: true, msg: 'Price is required field' },
        notEmpty: { args: true, msg: 'Price is required field' },
        checkmin(value) {
          if (value < 0) {
            throw new Error(`price can't below 0. are you nuts?`);
          }
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {args: true, msg: 'Stock is required field' },
        notEmpty: { args: true, msg: 'Stock is required field' },
        checkmin(value) {
          if (value < 0) {
            throw new Error("stock can't below 0. are you nuts!");
          }
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {args: true, msg: 'category is required field' },
        notEmpty: { args: true, msg: 'category is required field' }
      }
    }
  }, {
    sequelize,
    modelName: 'Product'
  });
  Product.associate = function (models) {
    // associations can be defined here
  };
  return Product;
};