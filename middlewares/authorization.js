const { Product } = require('../models');

const authorization = (req, res, next) => {
  let { id } = req.params;

  Product.findByPk(id)
    .then(result => {
      if(result) {
        if(result.UserId == req.UserId || req.UserRole == 'admin') {
          next();
        } else {
          return next({
            code: 401,
            message: `You cannot access this service`
          });
        }
      } else {
        return next({
          code: 404,
          message: `Product Not Found`
        });
      }
    })
    .catch(err => {
      return next(err);
    })
}

module.exports = authorization;