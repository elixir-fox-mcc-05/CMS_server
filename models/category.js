'use strict';
module.exports = (sequelize, DataTypes) => {
const Model = sequelize.Sequelize.Model

class Category extends Model {}

Category.init({
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        args: true,
        message: 'Type is Required'
      },
      notEmpty: {
        args: true,
        message: 'Type cannot be empty'
      }
    }
  }
},{
  sequelize
})
  Category.associate = function(models) {
    // associations can be defined here
    Category.hasMany(models.Product)
  };
  return Category;
};