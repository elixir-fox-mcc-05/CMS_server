'use strict';
module.exports = (sequelize, DataTypes) => {
  // const Cart = sequelize.define('Cart', {
  //   UserId: DataTypes.INTEGER,
  //   ProductId: DataTypes.INTEGER,
  //   quantity: DataTypes.INTEGER
  // }, {});

  class Cart extends sequelize.Sequelize.Model {}

  Cart.init({
    // Model attributes are defined here
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull:{
          arg: true,
          msg: 'UserId may not be blank'
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull:{
          arg: true,
          msg: 'ProductId may not be blank'
        }
      }
      // allowNull defaults to true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min:{
          args:[0],
          msg:"Product quantity cannot be lower than zero"
        }
      }
    }
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Cart' // We need to choose the model name
  });

  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.User, {foreignKey: 'UserId'})
    Cart.belongsTo(models.Product, {foreignKey: 'ProductId'})
  };
  return Cart;
};