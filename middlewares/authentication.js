const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

const aunthentication = (req, res, next) => {
    let { access_token } = req.headers

    try {
        let decoded = verifyToken(access_token)
        let { id } = decoded
        User.findByPk(id)
            .then(result => {
                if (result) {
                    req.currentUserId = result.id
                    next()
                } else {
                    res.status(401).json({
                        msg: "User is not logged in",
                        loc: "@authentication"
                    })
                }
                
            })
            .catch(error => {
                res.status(500).json({
                    msg: "Server error",
                    loc: "@authentication",
                    error
                })
            })

    } catch (error) {
        res.status(401).json({
            loc: "@authentication",
            error
        })
    }
}

module.exports = aunthentication
