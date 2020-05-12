const { Product } = require('../models')

module.exports = (req, res, next) => {
    const { id } = req.params;

    Product.findByPk(id)
        .then(result => {
            if (result) {
                if (result.UserId === req.currentUserId) next()
                else {
                    res.status(401).json({
                        msg: "User is unauthorized to do this action",
                        loc: "@authorization"
                    })
                }
            } else {
                res.status(404).json({
                    msg: `Product with id ${id} is not available`,
                    loc: "@authorization"
                })
            }
        })
}
