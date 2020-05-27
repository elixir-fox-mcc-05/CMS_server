'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize;

  class Cart extends Model {}


  Cart.init({
    CustomerId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Customers",
        key: "id"
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
      hooks: true
    },
    total_price: {
      type: DataTypes.NUMERIC,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: {
          args: [0],
          msg: 'Total price has to be greater than zero'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Cart',
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    }
  });
  Cart.associate = function(models) {
    Cart.belongsTo(models.Customer)
    Cart.belongsToMany(models.Product, { through: models.ProductCarts })
  };
  return Cart;
};