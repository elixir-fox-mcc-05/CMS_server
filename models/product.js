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
        isUrl: {
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
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'Stock cannot be less than 0'
        },
        // isPositive: (value) => {
        //   if (+value < 0) {
        //     throw new Error('Stock cannot be less than 0')
        //   }
        // }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'Stock cannot be less than 0'
        },
        // isPositive: (value) => {
        //   if (+value < 0) {
        //     throw new Error('Stock cannot be less than 0')
        //   }
        // }
      }
    },
    users: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {
    sequelize,
    hooks: {
      beforeCreate: (product) => {
        if (!product.description) product.description = "No description"
      }
    },
    // validate: {
    //   isPositive: () => {
    //     if (this.price < 0) {
    //       console.log('@validate price');          
    //       throw new Error('Price cannot be less than 0')
    //     } else if (this.stock < 0) {
    //       console.log('@validate stock');          
    //       throw new Error('Stock cannot be less than 0')
    //     }
    //   }
    // }
  });
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};
