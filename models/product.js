"use strict";
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class Product extends Model {}

  Product.init(
    {
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
            msg: "Name is required"
          },
          len: {
            args: [3],
            msg: "Minimum Name must be 3 characters"
          }
        }
      },
      image_url: {
        type: DataTypes.STRING,
        validate: {
          isUrl: {
            args: true,
            msg: "Incorrect url format"
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
            msg: "Price is required"
          },
          min: {
            args: [0],
            msg: "Price can not have value below zero"
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
            msg: "Stock is required"
          },
          min: {
            args: [0],
            msg: "Stock can not have value below zero"
          }
        }
      },
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id"
        },
        onUpdate: "Cascade",
        onDelete: "Cascade"
      }
    },
    {
      sequelize
    }
  );

  Product.associate = function (models) {
    // associations can be defined here
    Product.belongsTo(models.User);
  };
  return Product;
};
