'use strict';
module.exports = (sequelize, DataTypes) => {

  class Category extends sequelize.Sequelize.Model { }

  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull : {args : false, msg : "Name is required field"}
    }
  }, {
    sequelize,
    modelName: 'Category'
  });
  Category.associate = function (models) {
    Category.hasMany(models.Product)
  };
  return Category;
};