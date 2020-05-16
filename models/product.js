'use strict';
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
            msg: `Product name is required`
          },
          notEmpty: {
            msg: `Product name cannot be empty`
          }
        }
      },
      image_url: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          isInt: {
            msg: `Price must be integer`
          }
        }
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          isInt: {
            msg: `Stock must be integer`
          }
        }
      },
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'Cascade',
        onDelete: 'Cascade'
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Categories',
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
    Product.belongsTo(models.Category);
  };
  return Product;
};
