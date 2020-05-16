const { Product } = require('../models');

function authorization(req, res, next) {
  let { id } = req.params;

  Product.findByPk(id)
    .then((result) => {
      if (result) {
        if (result.AssignorId == req.currentUserId) {
          next();
        } else {
          throw {
            msg: 'unauthorized',
            code: 401,
          };
        }
      } else {
        throw {
          msg: 'Product not found',
          code: 404,
        };
      }
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { authorization };
