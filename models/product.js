'use strict';
module.exports = (sequelize, DataTypes) => {

  class Product extends sequelize.Sequelize.Model { }

  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { args: true, msg: 'name already used' },
      validate: {
        notNull: {args: true, msg: 'Name is required field' },
        notEmpty: { args: true, msg: 'Name is required field' },
        len: { args: [3], msg: 'Name must more than 3 letters' }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {args: true, msg: 'image_url is required field' },
        notEmpty: { args: true, msg: 'image_url is required field' },
        isUrl: {args : true, msg:'image url must in URL format'}
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {args: true, msg: 'Price is required field' },
        notEmpty: { args: true, msg: 'Price is required field' },
        checkmin(value) {
          if (value < 0) {
            throw new Error(`price can't below 0. are you nuts?`);
          }
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {args: true, msg: 'Stock is required field' },
        notEmpty: { args: true, msg: 'Stock is required field' },
        checkmin(value) {
          if (value < 0) {
            throw new Error("stock can't below 0. are you nuts!");
          }
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: {args : false,msg: "category is required field"},
      validate: {
        checkdata(value) {
          if(value == '' || value == null){
            throw new Error("category is required field");
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product'
  });
  Product.associate = function (models) {
    Product.belongsTo(models.Category)
  };
  return Product;
};