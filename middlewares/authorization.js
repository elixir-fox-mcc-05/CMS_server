const { User, Product } = require('../models');

module.exports = {
    authorizeAdmin: (req, res, next) => {
        const { id } = req.params;

        Product
            .findById(id, {
                include: {
                    model: User,
                    attributes: { exclude: ['password'] }
                }
            })
            .then(product => {
                if(product) {
                    if(product.UserId === req.uid && product.User.role === 'admin') {
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