'use strict';
module.exports = (sequelize, DataTypes) => {
  let {Model} = sequelize.Sequelize
  class Product extends Model {}
  Product.init({
    name: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Price is required'
        },
        notNull: {
          args: true,
          msg: 'Price is required'
        },
        min: {
          args: [0],
          msg: 'Incorect Price Number'
        }
      }
    },
    stock: DataTypes.INTEGER,
    image_url: DataTypes.STRING,
    tags: DataTypes.STRING
  }, {sequelize});
    
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};