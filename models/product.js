'use strict';
module.exports = (sequelize, DataTypes) => {

  class Product extends sequelize.Sequelize.Model {}

  Product.init({
    name:{ 
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        arg: 'Product name already registered. Please use a different password'
      },
      validate:{
        notNull:{
          arg: true,
          msg: 'Product name must not be empty'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull:{
          arg: true,
          msg: 'Product price must not be empty'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull:{
          arg: true,
          msg: 'Product stock must not be empty'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          arg: true,
          msg: 'Product category must not be empty'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull:{
          arg: true,
          msg: 'UserId must be defined'
        }
      }
    }
  }, {
    hooks:{
      beforeCreate: (user,options) =>{
        user.password = encryptPassword(user.password)
      }
    },
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Product' // We need to choose the model name
  });


  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};