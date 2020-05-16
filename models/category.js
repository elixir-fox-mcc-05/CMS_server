'use strict';
module.exports = (sequelize, DataTypes) => {

  class Category extends sequelize.Sequelize.Model { }

  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull : false,
      unique : {args: true, msg: 'name already existed'},
      validate: {
        notNull: {args: true, msg: 'Name is required field' },
        notEmpty: { args: true, msg: 'Name is required field' }
      }
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