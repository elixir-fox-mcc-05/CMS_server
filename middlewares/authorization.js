const { User, Product } = require('../models');

module.exports = {
    authorizeAdmin: (req, res, next) => {
        User
            .findByPk(req.uid)
            .then(user => {
                if(user.role === 'admin') {
                    next();
                } else {
                    throw{
                        msg: 'Only admin has the authority to do this action',
                        code: 401
                    }
                }
            })
            .catch(err => {
                next(err);
            })
    },
    authorizeAdminOnProduct: (req, res, next) => {
        const { id } = req.params;

        Product
            .findByPk(id)
            .then(product => {
                if(product) {
                    if(product.UserId === req.uid) {
                        next();
                    } else {
                        throw{
                            msg: 'You dont have the authority to do this action',
                            code: 401
                        }
                    }
                } else {
                    throw{
                        msg: `no product with id ${id} found`,
                        code: 404
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }
}