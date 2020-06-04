const { decode } = require('../helpers/jwt')
const { User } = require('../models')

const auhtentication = (req, res, next) => {
    try {
        const payload = decode(req.headers.access_token)
        User.findOne({
            where: {
                email: payload.email
            }
        })
        .then((result) => {
            if (result) {
                // console.log(payload)
                req.currentuserId = result.id
                return next()
            } else {
                return next({
                    name: 'Unauthorized',
                    errors: [{ message: 'Unauthenticated user detected' }]
                })
            }
        }).catch((err) => {
            return next(err)
        });
    } catch (err) {
        return next(err)
    }
}

module.exports = auhtentication