'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class Product extends Model {}

  Product.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            args: true,
            msg: 'Please insert name',
          },
          notEmpty: {
            args: true,
            msg: 'Please insert name',
          },
        },
      },
      image_url: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            args: true,
            msg: 'Please insert image url',
          },
          notEmpty: {
            args: true,
            msg: 'Please insert image url',
          },
          isUrl: {
            args: true,
            msg: 'Please insert valid url ex:(foo@bar.com)',
          },
        },
      },
      price: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: {
            args: true,
            msg: 'Please insert price',
          },
          notEmpty: {
            args: true,
            msg: 'Please insert price',
          },
          min: {
            args: 0,
            msg: 'Inputted price should greater or equal 0',
          },
        },
      },
      stock: {
        allowNull: false,
        type: DataTypes.INTEGER,
        notNull: {
          args: true,
          msg: 'Please insert stock',
        },
        notEmpty: {
          args: true,
          msg: 'Please insert stock',
        },
        min: {
          args: 0,
          msg: 'Inputted stock should greater or equal 0',
        },
      },
    },
    {
      sequelize,
    }
  );
  Product.associate = function (models) {
    Product.belongsTo(models.User);
  };
  return Product;
};
