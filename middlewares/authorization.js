const { Task } = require('../models')

function authorization (req, res, next) {
    let { id } = req.params
    Task.findByPk(id)
        .then(data => {
            if(data) {
                if(data.AssignorId == req.currentUserId) {
                    next()
                } else {
                    throw {
                        msg: 'unauthorized',
                        code: 401
                    }
                }
            } else {
                throw {
                    msg: 'task not found',
                    code: 404
                }
            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = authorization