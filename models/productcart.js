'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize;

  class ProductCart extends Model {}

  ProductCart.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        notEmpty: {
          msg: 'Product quantity can\'t be empty'
        },
        isInt: {
          msg: 'Product quantity must be an integer value'
        }
      }
    },
    price: {
      type: DataTypes.NUMERIC,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Product price can\'t be empty'
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        allowNull: false,
        key: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
      hooks: true
    },
    CartId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Carts',
        allowNull: false,
        key: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
      hooks: true
    }
  }, {
    sequelize,
    modelName: 'ProductCart',
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    }
  });
  ProductCart.associate = function(models) {
    ProductCart.belongsTo(models.Product);
    ProductCart.belongsTo(models.Cart);
  };
  return ProductCart;
};