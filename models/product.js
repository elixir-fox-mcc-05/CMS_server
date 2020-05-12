'use strict';
module.exports = (sequelize, DataTypes) => {
  class Product extends sequelize.Sequelize.Model {}

  Product.init({
    name: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Name cannot be empty'
        },
        notEmpty: {
          args: true,
          msg: 'Name cannot be empty'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        isURL: {
          args: true,
          msg: "Invalid url format for product image"
        }
      }
    },
    description: {
      type: DataTypes.STRING(999),
      defaultValue: "No description"
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    users: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {
    sequelize,
    hooks: {
      beforeCreate: (product) => {
        if (!product.description) product.description = "No description"
      }
    }
  });
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};
