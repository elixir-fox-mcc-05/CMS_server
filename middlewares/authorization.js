// const { Product } = require('../models')
const { User } = require('../models')

const authorization = (req, res, next) => {
    console.log(req.currentuserId)
    User.findOne({
        where: {
            id: req.currentuserId
        }
    })
    .then((result) => {
        if (result) {
            if (result.role == 'admin') {
                return next()
            } else {
                return next({
                    name: 'Unauthorized',
                    errors: [{ message: 'Unauthorized access detected' }]
                })
            }
        } else {
            return next({
                name: 'NotFound',
                errors: [{ message: 'User Not Found' }]
            })
        }
    }).catch((err) => {
        return next(err)
    });
} 

module.exports = authorization