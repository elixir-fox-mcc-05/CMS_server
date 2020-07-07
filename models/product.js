'use strict';
module.exports = (sequelize, DataTypes) => {
  let {Model} = sequelize.Sequelize
  class Product extends Model {}
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Incorect Product Name'
        },
        notNull: {
          args: true,
          msg: 'Incorect Product Name'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Price is required'
        },
        notNull: {
          args: true,
          msg: 'Price is required'
        },
        min: {
          args: [0],
          msg: 'Incorect Price Number'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Price is required'
        },
        notNull: {
          args: true,
          msg: 'Price is required'
        },
        min: {
          args: [0],
          msg: 'Incorect Stock Number'
        }
      }
    },
    image_url: DataTypes.STRING,
    tags: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Incorect Product Tags'
        },
        notNull: {
          args: true,
          msg: 'Incorect Product Tags'
        }
      }
    },
  }, {sequelize});
    
  Product.associate = function(models) {
    Product.belongsToMany(models.User, { through: 'Cart' })
  };
  return Product;
};