'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model;

  class Category extends Model {}

  Category.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : {
        msg : `Category name already exists`
      },
      validate : {
        notEmpty : {
          msg : 'Category name cannot be empty'
        },
        notNull : {
          msg : 'Category name cannot be null'
        }
      }
    }
  }, {
    sequelize,
    modelName : `Category`
  })

  Category.associate = function(models) {
    // associations can be defined here
    Category.hasMany( models.Product)
  };
  return Category;
};