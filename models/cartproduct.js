'use strict';
module.exports = (sequelize, DataTypes) => {

  class CartProduct extends sequelize.Sequelize.Model {}

  CartProduct.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Quantity is required'
        },
        notEmpty: {
          args: true,
          msg: 'Quantity is required'
        },
        min: {
          args: [1],
          msg: 'Quantity can not have value below one'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Status is required'
        },
        notEmpty: {
          args: true,
          msg: 'Status is required'
        }
      }
    },
    CartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'CartId is required'
        },
        notEmpty: {
          args: true,
          msg: 'CartId is required'
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'ProductId is required'
        },
        notEmpty: {
          args: true,
          msg: 'ProductId is required'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (cartproduct) => {
        if(!cartproduct.status) {
          cartproduct.status = 'Created'
        }
      }
    }
  })
  
  CartProduct.associate = function(models) {
    CartProduct.belongsTo(models.Cart, { foreignKey: "CartId", targetKey: "id" });
    CartProduct.belongsTo(models.Product, { foreignKey: "ProductId", targetKey: "id" });
  };
  return CartProduct;
};