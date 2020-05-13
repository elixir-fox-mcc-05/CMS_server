const {User} = require('../models');
const {verifyToken} = require('../helpers/jwt.js');

function authentication(req, res, next) {
    let token = req.headers.token;
    // console.log(token)
    if (!token) {
        return next({
            type: 'Bad Request',
            code: 400,
            message: 'Please login!'
        })
    }

    try {
        let check = verifyToken(token);
        let {id} = check;
        // console.log(password)
        User.findByPk(id)
            .then(result => {
                if (result) {
                    req.UserId = id
                    next()
                } else {
                    throw {
                        message: 'Not authenticated',
                        code: 401
                    }
                }

            })
            .catch(err => {
                next(err)
            })
    } 
    catch (error) {
        next(err)  
    }
}

module.exports = authentication;