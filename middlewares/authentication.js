const { verifyToken } = require('../helpers/jwt.js');
const { User } = require('../models');

const authentication = (req, res, next) => {
  let token = req.headers.token;
  try {
    let decode = verifyToken(token);
    let { id } = decode;
    User.findByPk(id)
      .then(result => {
        if (result) {
          req.UserId = result.id;
          req.UserRole = result.role;
          next();
        } else {
          return next({
            code: 401,
            message: 'Invalid Access Token'
          });
        }
      })
      .catch(err => {
        return next(err);
      });
  } catch (error) {
    return next(error);
  }
};

module.exports = authentication;
