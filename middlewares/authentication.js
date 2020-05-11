const { User } = require('../models');
const { verifyToken } = require('../helpers/jwt');

module.exports = {
    authenticateUser: (req, res, next) => {
        const { access_token } = req.headers;

        try {
            let decoded = verifyToken(access_token);
            const { id } = decoded;

            User
                .findByPk(id)
                .then(user => {
                    if(user) {
                        req.uid = user.id;
                        next();
                    } else {
                        throw{
                            msg: 'You dont have the authority to do this action',
                            code: 401
                        }
                    }
                })
                .catch(err => {
                    next(err);
                })
        }
        catch(err) {
            next(err);
        }
    }
}