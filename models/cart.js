'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class Cart extends Model {}

  Cart.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
      },
      ProductId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: {
            args: true,
            msg: 'Please insert product',
          },
          notEmpty: {
            args: true,
            msg: 'Please insert product',
          },
        },
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: {
            args: true,
            msg: 'Please insert quantity',
          },
          notEmpty: {
            args: true,
            msg: 'Please insert quantity',
          },
          min: {
            args: [1],
            msg: 'Inputted quantity should greater than 1',
          },
        },
      },
      status: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
    }
  );

  Cart.associate = function (models) {
    Cart.belongsTo(models.Product);
    Cart.belongsTo(models.User);
  };
  return Cart;
};
