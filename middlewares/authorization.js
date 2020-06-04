const { Product } = require('../models');
const { User } = require('../models')

function authorization(req, res, next) {
    let userId = req.currentUserId
    User
        .findByPk(userId)
            .then(user => {
                if (user) {
                    if(user.role === 'admin') {
                        next()
                    } else {
                        next({
                            name: 'Unauthorized',
                            errors: { message: `User don't have access`}
                        })
                    }
                } else {
                    next({
                        name: `Not Found`,
                        errors: { message: `Item Not Found`}
                    })
                }
            }).
            catch(err => {
                next(err)
            })
}

module.exports = authorization;