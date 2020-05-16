'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize;

  class Category extends Model {}

  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Category already created'
      },
      validate: {
        notEmpty: {
          msg: 'name can\'t be empty'
        }
      }
    },
    total_product: {
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue: 0,
      validate: {
        min: {
          args: [0],
          msg: 'Total product can\'t be less than 0'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Category'
  });
  Category.associate = function(models) {
    Category.hasMany(models.Product);
  };
  return Category;
};