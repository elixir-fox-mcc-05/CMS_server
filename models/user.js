'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model;

  class User extends Model {}

  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: `Email must be written in email format`
        },
        isEmpty: {
          args: true,
          msg: `Email can't be empty`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        isEmpty: {
          args: true,
          msg: `Password can't be empty`
        },
        len: {
          args: [6],
          msg: `Password must consist at least 6 character`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User'
  });

  User.associate = function(models) {
    User.hasMany(models.Product, { foreignKey: 'UserId', targetKey: 'id' });
  };
  return User;
};