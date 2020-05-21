'use strict';
module.exports = (sequelize, DataTypes) => {
  class Product extends sequelize.Sequelize.Model{
    get id() {
      return this.id
    }
    get name() {
      return this.name
    }
    get image_url() {
      return this.image_url
    }
    get price() {
      return this.price
    }
    get category() {
      return this.category
    }
  }

  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull : {
          args:true,
          msg: 'name is required'
        }
      }
    }, 
    image_url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          args : true,
          msg: 'this must be filled with an URL'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        greaterThanZero() {
          if (this.price <= 0) {
            throw new Error(`You can't get the price to be negative`)
          }
        },
        isNan() {
          if (isNaN(this.stock)) {
            throw new Error('Price Must be Integer!')
          }
        },
        notNull: {
          args: true,
          msg: 'Price is required field'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        greaterThanZeroStk() {
          if (this.stock < 0) {
            throw new Error('Stock must be greater than 0')
          }
        },
        isNan() {
          if (isNaN(this.stock)) {
            throw new Error('Stock Must be Integer!')
          }
        },
        notNull: {
          args: true,
          msg: 'Stock is required field'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Category is required field'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (Product, options) => {
        if (Product.image_url == '') {
          Product.image_url = 'https://discountseries.com/wp-content/uploads/2017/09/default.jpg'
        }
      },
      beforeUpdate: (Product, options) => {
        Product.updatedAt = new Date().toISOString()
      }
    },
    models: 'Product'
  })
  Product.associate = function(models) {
    // associations can be defined here
    Product.hasMany(models.Cart, { foreignKey: 'productId' })
    Product.hasMany(models.Order, { foreignKey: 'productId' })
  };
  return Product;
};