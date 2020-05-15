function error_handler(err, req, res, next) {
    if (err.name == 'SequelizeValidationError') {
        let errorMessage = err.errors.map(el => { return el.message })
        res.status(400).json({ name: `Sequelize validation error :`, data: errorMessage })
    } else if (err.name == 'SequelizeDatabaseError') {
        let errorMessage = err.errors.map(el => { return el.message })
        res.status(400).json({ name: `Sequelize validation error :`, data: errorMessage })
    } else if (err.name == 'ReferenceError') {
        res.status(404).json({ err: `NOT FOUND` })
    } else if (err.name == "JsonWebTokenError") {
        res.status(400).json({ name: `Indentify your status error`, data: `you're not logged in yet` })
    } else if (err.name == "SequelizeUniqueConstraintError") {
        res.status(400).json({ name: `email must unique`, data: `your mail already exist` })
    } else {
        console.log(err)
        res.status(500).json({ err: err.name })
    }
}

module.exports = error_handler 