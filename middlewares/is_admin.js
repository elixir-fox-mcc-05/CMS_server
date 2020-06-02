const { User } = require('../models')
const { verify_token } = require('../helpers/jsonwebtoken')

function is_admin(req, res, next) {
    let payload = verify_token(req.headers.access_token)
    let { email } = payload
    
    User.findOne({ where: { email } })
        .then(user => {
            if (user.role == 'admin') {
                next()
            } else {
                next(err)
            }
        })
        .catch(err => { next(err) })
}

module.exports = is_admin