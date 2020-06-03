const { Cart } = require('../models/index')

function cartAuth(req, res, next){
    let { cartId } = req.params
    Cart.findByPk(Number(cartId))
        .then(data => {
            if(data) {
                if(data.UserId == req.currentUserId){
                    next()
                }
                else {
                    return next({
                        name: `Unauthorized`,
                        errors: [{
                            message: `User Unauthorized`
                        }]
                    })
                }
            }
            else {
                return next({
                    name: `NotFound`,
                    message: `Cart with id ${cartId} NOT FOUND`
                })
            }
        })
}

module.exports = cartAuth;