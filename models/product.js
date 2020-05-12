'use strict';
module.exports = (sequelize, DataTypes) => {
  
  const { Model } = sequelize.Sequelize;

  class Product extends Model {}

  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Product already added to the system'
      },
      validate: {
        notEmpty: {
          msg: 'Product name can\'t be empty'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Product image already added to the system'
      },
      validate: {
        notEmpty: {
          msg: 'Product image can\'t be empty'
        },
        isUrl: {
          msg: 'Invalid image url format'
        }
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Product price can\'t be empty'
        },
        min: {
          args: [0],
          msg: 'Product price has to be greater than zero'
        },
        isNumeric:{
          msg: 'Product price must be a numeric value'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Product stock can\'t be empty'
        },
        isInt: {
          msg: 'Product stock must be an integer value'
        },
        min: {
          args: [0],
          msg: 'Product stock has to be greater than zero'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
      hooks: true
    }
  }, {
    sequelize,
    modelName: 'Product',
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    }
  });
  Product.associate = function(models) {
    Product.belongsTo(models.User);
  };
  return Product;
};