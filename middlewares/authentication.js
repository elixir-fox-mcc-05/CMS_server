const { verifyToken } = require('../helpers/jwt')
const { User, Customer } = require('../models')

function authentication (req, res, next) {
    let token = req.headers.token
    try {
        let decoded = verifyToken(token)
        let { id } = decoded
        User.findByPk(id)
            .then(data => {
                if(data) {
                    req.currentUserId = id
                    next()
                } else {
                    throw {
                        msg: 'Please login first',
                        code: 401
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

function customerAuthentication (req, res, next) {
    let token = req.headers.token
    try {
        let decoded = verifyToken(token)
        let { id } = decoded
        Customer.findByPk(id)
            .then(data => {
                if(data) {
                    req.currentUserId = id
                    next()
                } else {
                    throw {
                        msg: 'Please login first',
                        code: 401
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

module.exports = {
    authentication,
    customerAuthentication
}