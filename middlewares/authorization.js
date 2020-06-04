const { Product } = require('../models/')

function authorization(req, res, next) {
    let { id } = req.params
    Product.findByPk(id)
        .then(data => {
            if(data){
                if(data.UserId == req.userid){
                    next()
                } else {
                    throw{
                        code: 401,
                        message: `unauthorized`
                    }
                }
            } else {
                throw{
                    code: 404,
                    message: `product not found`
                }
            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = authorization