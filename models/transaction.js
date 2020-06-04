'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Transaction extends Model {}

  Transaction.init({
    total_price: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      defaultValue : 'pending',
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          message: 'payment method required'
        }
      }
    },
    UserId : {
      type : DataTypes.INTEGER,
      refrences : {
        model : 'Users',
        key : 'id'
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      refrences: {
        model: 'Products',
        key: 'id'
      }
    }
  },{
    sequelize
  })
  Transaction.associate = function(models) {
    // associations can be defined here
    Transaction.belongsTo(models.User)
    Transaction.belongsTo(models.Product)
  };
  return Transaction;
};