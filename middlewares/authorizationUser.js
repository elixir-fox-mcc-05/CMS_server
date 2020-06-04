const {User, Transaction} = require('../models')

function authorizationUser(req, res, next) {
  const {listCheckOut} = req.body
  const promise = []
  const promises = listCheckOut.forEach(element => {
    promise.push(Transaction.findAll({where: {id: element.id}}))
  })
  Promise
    .all(promise)
    .then(data => {
      let count = 0
      data.forEach(element => {
        if (req.currentUser === element[0].dataValues.UserId) {
          count ++
        }
      })
      if(count === data.length){
        next()
      } else {
          return next({
            type: 'Bad Request',
            code: 400,
            msg: 'You are not allowed to do this'
          })
      }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = authorizationUser