'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model;
  class ProductPicture extends Model {}

  ProductPicture.init({
    filename: DataTypes.STRING,
    UserId: DataTypes.STRING,
    ProductId: {
      type : DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName : `ProductPicture`
  })
  
  ProductPicture.associate = function(models) {
    // associations can be defined here
    ProductPicture.belongsTo(models.Product)
    ProductPicture.belongsTo(models.User)
  };
  return ProductPicture;
};