const { Product } = require('../models');

function authorization(req, res, next) {
    let ProductId = req.params.productid;
    Product
        .findByPk(ProductId)
            .then(product => {
                if(product) {
                    if(product.UserId === req.currentUserId) {
                        next();
                    } else {
                        next({
                            name: 'Unauthorized',
                            errors: { message: `User don't have access`}
                        })
                    }
                } else {
                    next({
                        name: `Not Found`,
                        errors: { message: `Item Not Found`}
                    })
                }
            })
            .catch(err => {
                next(err);
            })
}

module.exports = authorization;