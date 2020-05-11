const { User } = require('../models');
const { compare } = require('../helpers/bcrypt.js');
const { generateToken } = require('../helpers/jwt.js');

class UserController {
  static login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({
      where: {
        email
      }
    })
      .then(result => {
        if (result) {
          if (compare(password, result.password)) {
            let token = generateToken({
              id: result.id,
              email: result.email,
              role: result.role
            });

            res.status(200).json({
              token
            });
          } else {
            return next({
              code: 401,
              message: `Password does not match`
            });
          }
        } else {
          return next({
            code: 401,
            message: `Invalid Email or Password`
          });
        }
      })
      .catch(err => {
        return next(err);
      });
  }
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
