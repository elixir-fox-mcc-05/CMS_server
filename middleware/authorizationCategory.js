const { Category } = require('../models')

function authorizationCategory(req, res, next) {

    Category
        .findByPk(req.params.id)
        .then(data => {

            //console.log(data)
            // return results
            if (data) {
                    //let results = Object.assign(data)
                    //console.log(results)
                    next()

            } else {

                res.status(404).json({
                    error : 'not found'
                })
            }

        })
    .catch(err => next(err))
}


module.exports = authorizationCategory