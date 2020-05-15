'use strict';
module.exports = (sequelize, DataTypes) => {
  let Model = sequelize.Sequelize.Model

  class Category extends Model {}

  Category.init({
    name: {
      allowNull : false,
      type : DataTypes.STRING,
      validate : {
        notNull : {
          args : true,
          msg : 'please input category name'
        }
      }
    }
  }, {
    sequelize
  })

  Category.associate = function(models) {
    // associations can be defined here
  };
  return Category;
};