'use strict';
module.exports = (sequelize, DataTypes) => {
  
  const { Model } = sequelize.Sequelize;

  class Product extends Model {}

  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Product already added to the system'
      },
      validate: {
        notEmpty: {
          msg: 'Product name can\'t be empty'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Product image already added to the system'
      },
      validate: {
        notEmpty: {
          msg: 'Product image can\'t be empty'
        },
        isUrl: {
          msg: 'Invalid image url format'
        }
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Product price can\'t be empty'
        },
        min: {
          args: [0],
          msg: 'Product price has to be greater than zero'
        },
        isNumeric:{
          msg: 'Product price must be a numeric value'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Product stock can\'t be empty'
        },
        isInt: {
          msg: 'Product stock must be an integer value'
        },
        min: {
          args: [0],
          msg: 'Product stock has to be greater than zero'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
      hooks: true
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
      hooks: true,
      validate: {
        notEmpty: {
          msg: 'Product Category can\'t be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    },
    hooks: {
      beforeCreate(product) {
        const { models } = sequelize;
        const id = product.CategoryId;

        return models.Category
          .findByPk(id)
          .then(category => {
            category.total_product++

            return models.Category
              .update({
                total_product: category.total_product
              }, {
                where: {
                  id
                }
              })
          })
          .catch(err => {
            throw(err);
          })
      },
      beforeBulkUpdate(options) {
        options.individualHooks = true
      },
      beforeUpdate(product) {
        const { models } = sequelize;
        const newId = product.dataValues.CategoryId;
        const previousId = product._previousDataValues.CategoryId;
        if(newId !== previousId) {
          return models.Category
            .findByPk(previousId)
            .then(category => {
              category.total_product--;
              return models.Category
                .update({
                  total_product: category.total_product
                }, {
                  where: {
                    id: category.id
                  }
                })
            })
            .then(() => {
              return models.Category
                .findByPk(newId)
            })
            .then(category => {
              category.total_product++;
              return models.Category
                .update({
                  total_product: category.total_product
                }, {
                  where: {
                    id: category.id
                  }
                })
            })
            .catch(err => {
              throw(err);
            })
        }
      },
      beforeBulkDestroy(options) {
        options.individualHooks = true
      },
      beforeDestroy(product) {
        const { models } = sequelize;
        const id = product.CategoryId

        return models.Category
          .findByPk(id)
          .then(category => {
            category.total_product--;
            return models.Category
              .update({
                total_product: category.total_product
              },{
                where: {
                  id
                }
              })
          })
          .catch(err => {
            throw(err);
          })
      }
    }
  });
  Product.associate = function(models) {
    Product.belongsTo(models.User);
    Product.belongsTo(models.Category);
  };
  return Product;
};