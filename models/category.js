'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model;

  class Category extends Model {}

  Category.init({
    name: {
      type : DataTypes.STRING,
      unique : {
        msg : `Category name already exists`
      },
      validate : {
        len : {
          args : [1,255],
          msg : `Category name needs minimum 1 character`
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