const { User } = require('../models')
const { verify_token } = require('../helpers/jsonwebtoken')

function admin_authentication(req, res, next) {
    let payload = verify_token(req.headers.access_token)
    let { email } = payload

    User.findOne({ where: { email } })
        .then(admin => {
            if (admin) {
                let isAdmin = false
                if (admin.role == 'admin') isAdmin = true
                res
                  .status(200)
                  .json({ isAdmin })
            }
        })
}

module.exports = admin_authentication