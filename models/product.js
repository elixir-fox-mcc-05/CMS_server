'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Product extends Model { }

  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Name Cannot Empty' },
        notEmpty: { args: true, msg: 'Name Cannot Empty' }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Image Cannot Empty' },
        isUrl: { args: true, msg: 'Invalid Image URL' }
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      notNull: { args: true, msg: 'Price Cannot Null' },
      min: { args: '0', msg: 'Price Cannot Negative' }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Stock Cannot Null' },
        min: { args: '0', msg: 'Stock Cannot ' }
      }
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  }, { sequelize })

  Product.associate = function (models) {
    // associations can be defined here
    Product.belongsTo(models.User)
  };
  return Product;
};