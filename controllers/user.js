let {User} = require('../models/index')
let {jwtToken} = require('../helpers/jwt')
let {compare} = require('../helpers/bycrypt')
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
        next({
          name: 'Password is to Weak',
          errors: [{msg: 'Password is to Weak'}]
        })
      });
  }
  static login(req, res, next) {
    console.log(req.body);
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then((result) => {
        if(result) {
          let temp = compare (req.body.password, result.dataValues.password)
          if(temp) {
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
          } else  {
            next({
              name: 'Wrong Password Or Email',
              errors: [{msg: 'Wrong Password Or Email'}]
            })
          }
        } else {
          next({
            name: 'Wrong Password Or Email',
            errors: [{msg: 'Wrong Password Or Email'}]
          })
        }
      })
      .catch((err) => {
        next({name: 'Wrong Password Or Email'})
      });
    }
}

module.exports = UserController