'use strict';
const { generatePassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class User extends Model {}

  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Email required.'
        },
        isEmail: {
          args: true,
          msg: "Must be an email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password Required.'
        },
        len: {
          args: [4, 18],
          msg: 'Password length must between 4 or 18 Characters.'
        }
      }
    },
    balance: {
      type: DataTypes.INTEGER
    },
    image: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(User, options) {
        User.password = generatePassword(User.password)
        console.log('beforeCreate', User.password);
        User.balance = 0
      }
    },
    sequelize
  })

  User.associate = function(models) {
    User.belongsToMany(models.Product, { through: 'UserProducts', as: 'users', foreignKey: 'userId' })
  };
  return User;
};