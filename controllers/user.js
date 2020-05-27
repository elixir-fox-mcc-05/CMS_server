let {User} = require('../models/index')
let {jwtToken} = require('../helpers/jwt')
class UserController {
  static register(req, res, next) {
    let data = {
      email: req.body.email,
      password: req.body.password,
      status: req.body.status
    }
    User.create(data)
      .then((result) => {
        let payload = {
          id: result.id,
          email: result.email
        }
        res.status(201).json(payload)
      })
      .catch((err) => {
        next(err)
      });
  }
  static login(req, res, next) {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then((result) => {
        console.log(result);
        let status = result.dataValues.status
        let data = {
          id: result.id,
          email: result.email,
        }
        let access_token = jwtToken(data)
        res.status(200).json({
          access_token,
          status,
          email: req.body.email
        })
      })
      .catch((err) => {
        next({name: 'Wrong Pass Or Email'})
      });
    }
}

module.exports = UserController