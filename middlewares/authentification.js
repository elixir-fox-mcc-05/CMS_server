let { verifyToken } = require('../helpers/jwt')
let { User } = require('../models/index')

function authentification (req, res, next) { 
  console.log('ssssssssssssssssssssssssssssssssssssssssssssssssssssssss');
  let token = req.headers.access_token
  try {
    let decode = verifyToken(token)
    let id = decode.id
    User.findByPk(id)
      .then((data) => {
        if(data) {
          req.currentUserId = decode.id
          next()
        } else {
          throw {
            msg:'you need to login',
            code:401
          }
        }
      })
      .catch(err => {
        throw err
      })
  } catch (err) {
    next(err)
  }
}

module.exports = {authentification}