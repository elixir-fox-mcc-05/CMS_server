const { User } = require('../models');

const adminauth = (req, res, next) => {
  let id = req.UserId;
  User.findByPk(id)
    .then(result => {
      if(result.role == 'admin') {
        next();
      } else {
        return next({
          code: 401,
          message: `You cannot access this service`
        });
      }
    })
    .catch(err => {
      return next(err);
    })
}

module.exports = adminauth;