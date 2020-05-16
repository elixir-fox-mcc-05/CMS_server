'use strict';
module.exports = (sequelize, DataTypes) => {
  class Role extends sequelize.Sequelize.Model{}
  Role.init({
    name: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : true
      }
    }
  }, {
    sequelize,
    modelName : "Role"
  });
  Role.associate = function(models) {
    Role.hasOne(models.User);
  };
  return Role;
};