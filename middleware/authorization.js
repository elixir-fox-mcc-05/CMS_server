const { Product } = require('../models')

function authorization(req, res, next) {

    Product
        .findByPk(req.params.id)
        .then(data => {

            //console.log(data)
            // return results
            if (data) {
                if (data.UserId == req.LoginId) {
                    //let results = Object.assign(data)
                    //console.log(results)
                    next()
                } else {

                    res.status(401).json({
                        msg: 'Unauthorized to access!'
                    })
                }

            } else {

                res.status(404).json({
                    msg: 'not found'
                })
            }

        })
    .catch(err => next(err))
}


module.exports = authorization