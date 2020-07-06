'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize;

  class ProductCart extends Model {}

  ProductCart.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Product quantity can\'t be empty'
        },
        min: {
          args: [1],
          msg: 'Product quantity can\'t be lest than 1'
        },
        isInt: {
          msg: 'Product quantity must be an integer value'
        }
      }
    },
    price: {
      type: DataTypes.NUMERIC,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notEmpty: {
          msg: 'Product price can\'t be empty'
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        allowNull: false,
        key: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
      hooks: true,
      validate: {
        notEmpty: {
          msg: 'Product id can\'t be empty'
        }
      }
    },
    CartId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Carts',
        allowNull: false,
        key: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
      hooks: true
    },
    paidStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'ProductCart',
    validate: {
      notDuplicate() {
        const { models } = sequelize;

        return models.ProductCart
          .findOne({
            where: {
              ProductId: this.ProductId,
              CartId: this.CartId,
              paidStatus: false
            }
          })
          .then(cartProduct => {
            if(cartProduct) {
              throw('Product already added to your cart')
            }
          })
          .catch(err => {
            throw(err);
          })
      }
    },
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    },
    hooks: {
      beforeCreate(cartProduct) {
        const { models } = sequelize;
        const productId = cartProduct.ProductId;
        const cartId = cartProduct.CartId;

        return models.Product
          .findByPk(productId)
          .then(product => {
            if (cartProduct.quantity > product.stock) {
              if (product.stock === 0) {
                throw({
                  msg: `${product.name} is out of stock`,
                  code: 400
                })
              } else {
                throw({
                  msg: `only ${product.stock} ${product.name} is available on the stock`,
                  code: 400
                })
              }
            } else {
              cartProduct.price = cartProduct.quantity * product.price

              return models.Cart
                .findByPk(cartId)
            }
            
          })
          .then(cart => {
            let total_price = +cart.total_price;
            total_price += +cartProduct.price;

            return models.Cart
              .update({
                total_price
              },{
                where: {
                  id: cartId
                }
              })
          })
          .catch(err => {
            throw(err);
          })
      },
      beforeBulkUpdate(options) {
        options.individualHooks = true;
      },
      beforeUpdate(cartProduct) {
        const { models } = sequelize;
        const productId = cartProduct.ProductId;
        const cartId = cartProduct.CartId;
        const newQuantity = cartProduct.dataValues.quantity;
        const prevQuantity = cartProduct._previousDataValues.quantity;
        const newPaidStatus = cartProduct.dataValues.paidStatus;
        const prevPaidStatus = cartProduct._previousDataValues.paidStatus;
        if (newQuantity !== prevQuantity) {
          const diff = newQuantity - prevQuantity;
          let productPrice;
          return models.Product
            .findByPk(productId)
            .then(product => {
              if(newQuantity > product.stock) {
                if (product.stock === 0) {
                  throw({
                    msg: `${product.name} is out of stock`,
                    code: 400
                  })
                } else {
                  throw({
                    msg: `only ${product.stock} ${product.name} is available on the stock`,
                    code: 400
                  })
                }
              } else {
                productPrice = +product.price
                cartProduct.price = +cartProduct.price + (diff * productPrice);
  
                return models.Cart
                  .findByPk(cartId) 
              }
            })
            .then(cart => {
              let total_price = +cart.total_price;
              total_price += diff * productPrice;
  
              return models.Cart
                .update({
                  total_price
                },{
                  where: {
                    id: cartId
                  }
                })
            })
            .catch(err => {
              throw(err);
            })
        } else if (newPaidStatus !== prevPaidStatus) {
          return models.Product
            .findOne({
              where: {
                id: cartProduct.ProductId
              }
            })
            .then(product => {
              let stock = product.stock;
              if (stock < cartProduct.quantity) {
                if (product.stock === 0) {
                  throw({
                    msg: `${product.name} is out of stock`,
                    code: 400
                  })
                } else {
                  throw({
                    msg: `only ${product.stock} ${product.name} is available on the stock`,
                    code: 400
                  })
                }
              } else {
                stock -= cartProduct.quantity
  
                return models.Product
                  .update({
                    stock
                  }, {
                    where: {
                      id: product.id
                    }
                  })
              }
            })
            .then(() => {
              return models.Cart
                .update({
                  total_price: 0
                }, {
                  where: {
                    id: cartProduct.CartId
                  }
                })
            })
            .catch(err => {
              throw(err);
            })
        }
        
      },
      beforeBulkDestroy(options) {
        options.individualHooks = true;
      },
      beforeDestroy(cartProduct) {
        const { models } = sequelize;
        const productId = cartProduct.ProductId;
        const cartId = cartProduct.CartId;
        let deletedPrice;

        return models.Product
          .findByPk(productId)
          .then(product => {
            deletedPrice = cartProduct.quantity * product.price;

            return models.Cart
              .findByPk(cartId)
          })
          .then(cart => {
            let total_price = +cart.total_price;
            total_price -= deletedPrice;

            return models.Cart
              .update({
                total_price
              },{
                where: {
                  id: cartId
                }
              })
          })
          .catch(err => {
            throw(err);
          })
      }
    }
  });
  ProductCart.associate = function(models) {
    ProductCart.belongsTo(models.Product);
    ProductCart.belongsTo(models.Cart);
  };
  return ProductCart;
};