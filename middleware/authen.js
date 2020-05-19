const { User } = require('../models')
const Helper = require('../helper/helper')


module.exports = (req, res, next) => {
    const { access_token } = req.headers
    try {
        const decoded = Helper.verify(access_token)
        req.UserId = decoded.id
        User.findOne({ where: { id: req.UserId } })
            .then(user => {
                if (user) {
                    next()
                } else {
                    res.status(401).json({ message: 'Please Login first' })
                }
            })
            .catch(next)
    } catch (err) {
        next(err)
    }

}