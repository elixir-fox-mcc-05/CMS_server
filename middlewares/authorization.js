const {User} = require('../models');

function authorization (req, res, next) {
    let id = req.UserId
    // console.log(id)

    User.findByPk(id)
        .then(user => {
            // console.log(user)
            if (user) {
                if (user.role == 'admin') {
                    next()
                }
                else {
                    res.status(401).json({message: 'User are unauthorized!'})
                }
            }
            else {
                res.status(404).json({message: 'User not found!'})
            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = authorization