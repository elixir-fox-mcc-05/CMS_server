const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models/index');

function authentication(req, res, next){
    let token = req.headers.token;
    console.log('token dari auth'+token)
    try {
        let decoded = verifyToken(token);
        let { id } = decoded      // it think i dont need this for this case?
        User.findByPk(Number(id))
            .then(data => {
                if(data){
                    req.currentUserId = Number(id); // it think i dont need this for this case?
                    return next()
                }
                else {
                    return next({     // it think i dont need this for this case?
                        name: 'NotFound',
                        errors: [{
                            message: 'User not found'
                        }]
                    })
                }
            })
            .catch(err => {
                return next ({    // it think i dont need this for this case?
                    name: `Unauthorized`,
                    errors: [{
                        message: `User Unauthenticated`
                    }]
                })
            })
      } catch(err) {
        next(err)
      }
}

module.exports = authentication;