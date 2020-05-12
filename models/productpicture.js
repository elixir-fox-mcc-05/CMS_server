'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model;
  class ProductPicture extends Model {}

  ProductPicture.init({
    filename: DataTypes.STRING,
    UserId: {
      type : DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName : `ProductPicture`
  })
  
  ProductPicture.associate = function(models) {
    // associations can be defined here
    ProductPicture.belongsTo(models.Product)
  };
  return ProductPicture;
};