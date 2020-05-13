'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Product extends Model {}

  Product.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull: {
          args : true,
          msg : 'product name is required'
        },
        notEmpty:{
          args : true,
          msg : "Product name cannot be Empty"
        }
      }
    },
    price: {
      type : DataTypes.INTEGER,
      defaultValue : 0,
      validate: {
        isInt : {
          args : true,
          msg : 'Must be integer'
        },
        min : {
          args : 1,
        }
      }
    },
    stock: {
      type : DataTypes.INTEGER,
      defaultValue : 0,
      validate : {
        isInt : {
          args : true,
          msg : 'Must be integer'
        },
        min : {
          args : 1,
        }
      }
    },
    imageUrl: DataTypes.STRING,
    UserId : {
      type : DataTypes.INTEGER,
      refrences : {
        model : 'Users',
        key : 'id'
      }
    }
  },{
    sequelize
  })
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.User)
  };
  return Product;
};