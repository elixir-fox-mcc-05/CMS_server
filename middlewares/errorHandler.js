module.exports = (err, req, res, next) => {
    if (err.name === "JsonWebTokenError") {
        res.status(401).json({
            msg: "You are unauthorized to complete this action, please sign in or contact admin",
            loc: "@jwt",
            error: err
        })
    } else if (err.name === "SequelizeValidationError") {
        let { message } = err.errors[0]

        res.status(400).json({
            code: 400,
            type: "Bad Request",
            loc: "@sequelize",
            msg: message,
            error: err
        })
    } else if (err.name === "SequelizeUniqueConstraintError") {
        let msg = ''
        if (err.original.table == 'Products') {
            msg = "Product already exists"
        } else if (err.original.table == 'Users') {
            msg = "Email has been registered"
        } else {
            msg = "Unique constraint"
        }
        res.status(400).json({
            msg,
            loc: "@sequelize",
            error: err
        })
    } else {
        res.status(err.code || 500).json({
            error: err
        })
    }
}
