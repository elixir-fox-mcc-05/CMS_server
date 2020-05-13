'use strict';
module.exports = (sequelize, DataTypes) => {
  class Category extends sequelize.Sequelize.Model{}
  Category.init({
    name: {
      type : DataTypes.STRING,
      unique : true,
      validate : {
        notEmpty : true
      }
    }
  }, {
    sequelize,
    modelName : "Category"
  });
  Category.associate = function(models) {
    Category.hasMany(models.Product);
  };
  return Category;
};