'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class Product extends Model {}

  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Product name required.'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Product image required.'
        }
      }
    },
    description: DataTypes.STRING,
    stock: {
      type: DataTypes.INTEGER
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Price must not be empty.'
        }
      }
    }
  }, {
    sequelize
  });
  Product.associate = function(models) {
    Product.belongsToMany(models.User, { through: 'UserProducts', as: 'products', foreignKey: 'productId' })

  };
  return Product;
};