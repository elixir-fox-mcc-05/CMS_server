const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

function authentication(req, res, next) {
  const { token } = req.headers;
  if (!token) {
    return next({
      type: "Bad Request",
      code: 400,
      message: "Please Login First"
    });
  } 
  try {
    const decode = verifyToken(token);
    const { id } = decode;
    User.findByPk(id).then((user) => {
      if (user) {
        req.currentUserId = user.id;
        next();
      } else {
        return next({
          type: "Bad Request",
          code: 400,
          message: "Please Login First"
        });
      }
    });
  } catch (error) {
    return next(error);
  }
}
module.exports = authentication;
