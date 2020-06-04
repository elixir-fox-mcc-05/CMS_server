'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class Order extends Model {

  }

  Order.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `First Name is required`
        },
        notEmpty: {
          msg: `First Name cannot be empty`
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Last Name is required`
        },
        notEmpty: {
          msg: `Last Name cannot be empty`
        }
      }
    },
    address: DataTypes.STRING,
    items: DataTypes.JSON,
    PaymentChannelId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'PaymentChannels',
        key: 'id'
      },
      onUpdate: 'Cascade',
      onDelete: 'Cascade'
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
    grandtotal: DataTypes.INTEGER
  }, {
    sequelize
  })

  Order.associate = function(models) {
    // associations can be defined here
    Order.belongsTo(models.PaymentChannel);
    Order.belongsTo(models.User);
  };
  return Order;
};