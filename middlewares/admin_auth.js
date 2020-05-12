const { Administrator } = require('../models')
const { verify_token } = require('../helpers/jsonwebtoken')

function admin_authentication(req, res, next) {
    let payload = verify_token(req.headers.admin_token)
    let { email } = payload

    Administrator.findOne({ where: { email } })
        .then(admin => {
            if (admin) {
                // req.adminId = admin.id  // no need
                next()
            }
        })
}

module.exports = admin_authentication