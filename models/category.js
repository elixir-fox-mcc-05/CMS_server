'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Category extends Model {}

  Category.init({
    name: DataTypes.STRING
  }, {
    sequelize
  });
  Category.associate = function(models) {
    Category.hasMany(models.Product);
  };
  return Category;
};