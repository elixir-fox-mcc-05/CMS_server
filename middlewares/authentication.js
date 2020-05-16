const { User } = require('../models')
const { verify_token } = require('../helpers/jsonwebtoken')

function authentication(req, res, next) {
    let payload = verify_token(req.headers.access_token)
    let { email } = payload

    User.findOne({ where: { email } })
        .then(data => {
            if (data) {
                req.UserId = data.id
                next()
            } else {
                next(err)
            }
        })
        .catch(err => next(err))
}

module.exports = authentication