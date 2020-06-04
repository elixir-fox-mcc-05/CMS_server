'use strict';
module.exports = (sequelize, DataTypes) => {

  class Banner extends sequelize.Sequelize.Model {}

  Banner.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {args: true, msg: 'Name is required field' },
        notEmpty: { args: true, msg: 'Name is required field' }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {args: true, msg: 'image_url is required field' },
        notEmpty: { args: true, msg: 'image_url is required field' },
        isUrl: {args : true, msg:'image url must in URL format'}
      }
    }
  }, {
    sequelize,
    modelName: 'Banner'
  });
  Banner.associate = function(models) {
    // associations can be defined here
  };
  return Banner;
};