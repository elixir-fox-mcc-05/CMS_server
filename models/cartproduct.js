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
      type: DataTypes.STRING
    },
    CartId: {
      type: DataTypes.INTEGER
    },
    ProductId: {
      type: DataTypes.INTEGER
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