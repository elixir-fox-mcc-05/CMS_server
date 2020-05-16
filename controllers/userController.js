const { User } = require('../models');
const { checkPassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class UserController {
  static register(req, res, next) {
    let { name, email, password, role } = req.body;
    User.create({
      name,
      email,
      password,
      role,
    })
      .then((data) => {
        res.status(201).json({
          data: {
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role,
          },
          msg: 'Register success',
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static login(req, res, next) {
    let { email, password } = req.body;
    User.findOne({
      where: { email },
    })
      .then((data) => {
        if (data) {
          let compare = checkPassword(password, data.password);
          if (compare) {
            let token = generateToken({
              id: data.id,
              name: data.name,
              email: data.email,
            });
            res.status(200).json({
              token,
              data: {
                id: data.id,
                name: data.name,
                email: data.email,
              },
              msg: 'Login success',
            });
          } else {
            throw {
              msg: 'Wrong email/password',
              code: 401,
            };
          }
        } else {
          throw {
            msg: 'Register first',
            code: 401,
          };
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static showUser(req, res, next) {
    User.findAll()
      .then((data) => {
        res.status(200).json({
          users: data,
        });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = UserController;
