const { User } = require("../models");
const { checkPassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class UserController {
  static register(req, res, next) {
    let { name, email, password, image_url, role } = req.body;
    User.create({
      name,
      email,
      password,
      role,
      image_url
    })
      .then((data) => {
        res.status(201).json({
          data: {
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role,
            image_url: data.image_url
          },
          msg: "Register success, go to login page"
        });
      })
      .catch((err) => {
        return next(err);
      });
  }

  static login(req, res, next) {
    let { email, password } = req.body;
    User.findOne({
      where: { email }
    })
      .then((data) => {
        if (data) {
          let compare = checkPassword(password, data.password);
          if (compare) {
            let token = generateToken({
              id: data.id,
              name: data.name,
              email: data.email
            });
            res.status(200).json({
              token,
              data: {
                name: data.name,
                role: data.role,
                image_url: data.image_url
              },
              msg: "Login success"
            });
          } else {
            return next({
              type: "Bad Request",
              code: 400,
              msg: "Wrong Password"
            });
          }
        } else {
          return next({
            type: "Bad Request",
            code: 404,
            msg: "User Doesn't exist"
          });
        }
      })
      .catch((err) => {
        return next(err);
      });
  }

  static showUser(req, res, next) {
    console.log("masuk find all")
    User.findAll({
      order: [["id", "ASC"]]
    })
      .then((data) => {
        res.status(200).json({
          users: data
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static findOne(req, res, next) {
    console.log("masuk find one");
    let { id } = req.params;
    User.findByPk(id)
      .then((data) => {
        if (!data) {
          throw {
            msg: `id with ${id} is not found`,
            code: 404
          };
        } else {
          res.status(200).json({
            user: data
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static updateRoleUser(req, res, next) {
    let { id } = req.params;
    let updateRole = { role: req.body.role };

    User.update(updateRole, {
      where: { id },
      returning: true
    })
      .then((result) => {
        res.status(200).json({
          msg: "user role has been updated"
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static delete(req, res, next) {
    let { id } = req.params;
    User.destroy({
      where: { id }
    })
      .then((data) => {
        if (data) {
          res.status(200).json({
            msg: `user with id ${id} succesfully deleted`
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = UserController;
