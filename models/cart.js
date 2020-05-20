'use strict';
module.exports = (sequelize, DataTypes) => {

  class Cart extends sequelize.Sequelize.Models {}

  Cart.init({
    CustomerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'CustomerId is required'
        },
        notEmpty: {
          args: true,
          msg: 'CustomerId is required'
        }
      }
    }
  }, {
    sequelize
  })

  Cart.associate = function(models) {
    Cart.belongsTo(models.Customer, { foreignKey: "CustomerId", targetKey: "id" })
    Cart.belongsToMany(models.Product, { through: "CartProducts" });
  };
  return Cart;
};