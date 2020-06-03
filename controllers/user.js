let {User, voucher} = require('../models/index')
let {jwtToken} = require('../helpers/jwt')
let {compare} = require('../helpers/bycrypt')
let {verifyToken} = require('../helpers/jwt')
let {send} = require('../helpers/gmail')
class UserController {
  static topUp (req, res, next) {
    if (req.body.topUpEmail && req.body.nominal) {
      let temp = ''
      for (let i = 0; i < 10; i++) {
        temp += Math.floor(Math.random() * 10)
      }
      let data = {
        code: temp,
        nominal: req.body.nominal
      }
      voucher.create(data)
      .then((result) => {
        send(req.body.topUpEmail, temp, req.body.nominal)
        res.status(200).json({
          result
        })
      })
    } else {
      next({
        name: 'Email Cannot Be Null',
        errors: [{msg: 'Email Cannot Be Null'}]
      })
    }
  }
  static rendem (req, res, next) {  
    let decode = verifyToken(req.body.access_token)
    voucher.findOne({where: {code: req.body.code}})
    .then((result) => {
      if(result) {
        User.findOne({where: {id: decode.id}})
          .then((thisUser) => {
            let newBal = thisUser.dataValues.balance + result.dataValues.nominal
            User.update(
              {
                balance: newBal
              },
              {returning: true, where:{id: decode.id}}
            )
            voucher.destroy({
              where: {
                code: req.body.code
              }
            })
            res.status(200).json(result.dataValues.nominal)
          })
      } else {
        next({
          name: 'Wrong Code Or Vourcer Already Used',
          errors: [{msg: 'Wrong Code Or Vourcer Already Used'}]
        })
      }
    })
  }
  static balance(req, res, next) {
    console.log(req.headers.access_token)
    let decode = verifyToken(req.headers.access_token)
    console.log(decode)
    User.findOne({
      where: {
        id: decode.id
      }
    }).then((result) => {
      res.status(200).json({
        result
      })
    })
  }
  static register(req, res, next) {
    let data = {
      email: req.body.email,
      password: req.body.password,
      status: req.body.status
    }
    User.findOne({
      where: {
        email: req.body.email
      }
    }) 
      .then((result) => {
        if (result) {
          next({
            name: 'Email Already Used',
            errors: [{msg: 'Email Already Used'}]
          })
        } else {
          return User.create(data)
          .then((result) => {
            let balance = result.dataValues.balance
            let status = result.dataValues.status
            let payload = {
              id: result.id,
              email: result.email
            }
            let access_token = jwtToken(payload)
              res.status(200).json({
                balance,
                status,
                access_token,
                email: req.body.email
              })
          })
        }
      })
      .catch((err) => {
        console.log(err);
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
        console.log('masukkkk login')
        console.log(result)
        if(result) {
          let temp = compare (req.body.password, result.dataValues.password)
          if(temp) {
            let balance = result.dataValues.balance
            let status = result.dataValues.status
            let data = {
              id: result.id,
              email: result.email,
            }
            let access_token = jwtToken(data)
            res.status(200).json({
              balance,
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
        console.log(err);
        next({name: 'Wrong Password Or Email'})
      });
    }
}

module.exports = UserController