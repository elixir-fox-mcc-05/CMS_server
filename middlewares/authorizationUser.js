const { User } = require("../models");

function authorizationUser(req, res, next) {
  let id = req.currentUserId
  User.findByPk(id)
    .then((user) => {
      if (user.role == "Super-admin") {
        next();
      } else {
        return next({
          type: "Unauthorized",
          code: "401",
          msg: "You are not authorized to use this feature"
        });
      }
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = authorizationUser;
