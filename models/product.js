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
      defaultValue: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/ImageNA.svg/600px-ImageNA.svg.png",
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
    category: {
      type: DataTypes.STRING,
      defaultValue: "Other"
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'Price cannot be less than 0'
        }
        //, isPositive: (value) => {
        //   if (+value < 0) {
        //     throw new Error('Price cannot be less than 0')
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
        }
        //, isPositive: (value) => {
        //   if (+value < 0) {
        //     throw new Error('Stock cannot be less than 0')
        //   }
        // }
      }
    },
    expiry: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: { msg: "Incorrect date format"},
        isPast:(date) => {
          let today = new Date()
          let expiryDate = new Date(date)
          if (expiryDate < today ) {
            throw ("Expiry date cannot be set in the past")
          }
        }
      }
    },
    users: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {
    sequelize,
    hooks: {
      beforeCreate: (product) => {
        if (!product.description) product.description = "No description"
        if (!product.category) product.category = "Other"
        if (!product.image_url) product.image_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/ImageNA.svg/600px-ImageNA.svg.png"
      }
    }
    //, validate: {
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
