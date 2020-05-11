const { User } = require('../models');

class UserController {
  static login(req, res, next) {}
  static register(req, res, next) {
    const { email, password, role } = req.body;
    User.create({
      email,
      password,
      role
    })
      .then(result => {
        const payload = {
          id: result.id,
          email: result.email,
          role: result.role
        };
        res.status(201).json(payload);
      })
      .catch(err => {
        return next(err);
      });
  }
}

module.exports = UserController;
