const Model = require('../models/index');
const User = Model.User;
const { checkPassword } = require('../helpers/bcryptjs');
const { generateToken } = require('../helpers/jsonwebtoken');

class UserController {
  static signUp(req, res, next) {
    let values = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    User.create(values)
      .then((data) => {
        res.status(201).json({
          CreatedUser: data,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static signIn(req, res, next) {
    let values = {
      email: req.body.email,
      password: req.body.password,
    };

    let options = {
      where: {
        email: req.body.email,
      },
    };

    User.findOne(options)
      .then((data) => {
        if (data) {
          let compare = checkPassword(values.password, data.password);
          if (compare) {
            let payload = {
              id: data.id,
              email: data.email,
              role: data.role,
            };
            let access_token = generateToken(payload);
            res.status(200).json({ access_token });
          } else {
            throw {
              code: 400,
              type: 'BAD REQUEST',
              message: 'Opps!, invalid email / password',
            };
          }
        } else {
          throw {
            code: 400,
            type: 'BAD REQUEST',
            message: 'Opps!, invalid email / password',
          };
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static findAllUsers(req, res, next) {
    let options = {
      where: {
        role: 'customer',
      },
    };

    User.findAll(options)
      .then((data) => {
        res.status(200).json({
          Users: data,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static banUser(req, res, next) {
    let options = {
      where: {
        id: req.params.id,
      },
    };
    let choosed = null;

    User.findOne(options)
      .then((data) => {
        choosed = data;
        User.destroy(options);
      })
      .then((_) => {
        res.status(200).json({
          BannedUser: choosed,
        });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = UserController;
