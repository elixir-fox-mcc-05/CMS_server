const Model = require('../models/index.js');
const Product = Model.Product;
const User = Model.User;
const Cart = Model.Cart;

const authorizationSpecial = (req, res, next) => {
  let id = req.signedInUserId;

  User.findByPk(id)
    .then((data) => {
      if (data) {
        if (data.role === 'admin') {
          next();
        } else {
          throw {
            code: 401,
            type: 'UNAUTHORIZED',
            message: 'Sorry, not authorized, you are not an admin',
          };
        }
      } else {
        throw {
          code: 401,
          type: 'UNAUTHORIZED',
          message: 'Sorry, not authorized, you are not an admin',
        };
      }
    })
    .catch((err) => {
      next(err);
    });
}

const authorization = (req, res, next) => {
  if (req.params.id) {
    let id = req.params.id;

    Product.findByPk(id)
      .then((data) => {
        if (data) {
          if (data.UserId === req.signedInUserId) {
            next();
          } else {
            throw {
              code: 401,
              type: 'UNAUTHORIZED',
              message: 'Sorry, not authorized, you are not an admin',
            };
          }
        } else {
          throw {
            code: 404,
            type: 'NOT FOUND',
            message: 'Sorry, not found',
          };
        }
      })
      .catch((err) => {
        next(err);
      });
  } else {
    authorizationSpecial()
  }
};

const authorizationCustomerCart = (req, res, next) => {
  if (req.params.id) {
    let id = req.params.id

    Cart.findByPk(id)
      .then((data) => {
        if (data) {
          if (data.UserId === req.signedInUserId) {
            next();
          } else {
            throw {
              code: 401,
              type: 'UNAUTHORIZED',
              message: 'Sorry, not authorized, please use correct account',
            };
          }
        } else {
          throw {
            code: 404,
            type: 'NOT FOUND',
            message: 'Sorry, not found',
          };
        }
      })
      .catch((err) => {
        next(err);
      });
  } else {
    authorizationSpecial()
  }
};

module.exports = {
  authorization,
  authorizationSpecial,
  authorizationCustomerCart
};
