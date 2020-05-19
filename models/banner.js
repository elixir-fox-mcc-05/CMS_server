'use strict';
module.exports = (sequelize, DataTypes) => {

  class Banner extends sequelize.Sequelize.Model {}

  Banner.init('Banner', {
    name: DataTypes.STRING,
    image_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Banner'
  });
  Banner.associate = function(models) {
    // associations can be defined here
  };
  return Banner;
};