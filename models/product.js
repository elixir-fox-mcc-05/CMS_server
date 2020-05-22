'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model;

  class Product extends Model{}
  
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Name is required"
        },
        notEmpty: {
          args: true,
          msg: "This field cannot be empty"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Image_url is required"
        },
        notEmpty: {
          args: true,
          msg: "This field cannot be empty"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Price is required"
        },
        notEmpty: {
          args: true,
          msg: "This field cannot be empty"
        },
        isNotNegative(value){
          if (value < 0){
            throw new Error("Price cannot less than zero")
          }
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Stock is required"
        },
        notEmpty: {
          args: true,
          msg: "This field cannot be empty"
        },
        isNotNegative(value){
          if (value < 0){
            throw new Error("Stock cannot less than zero")
          }
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "UserId is required"
        },
        notEmpty: {
          args: true,
          msg: "This field cannot be empty"
        }
      }
    }
  },
  {
    sequelize, modelName: "Product"
  });

  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.User);
  };
  return Product;
};