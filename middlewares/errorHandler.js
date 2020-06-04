const errorHandler = (err, req, res, next) => {
    if (err.name == 'SequelizeValidationError') {
        const errors = err.errors.map(el => {
            return { message: el.message }
        })
        console.log(errors)
        return res.status(400).json({
            errors
        })
    } else if (err.name == 'SequelizeUniqueConstraintError') {
        const errors = err.errors.map(el => {
            return { message: el.message }
        })
        console.log(errors)
        return res.status(400).json({
            errors
        })
    }  else if (err.name == 'BadRequest') {
        return res.status(400).json({
            errors: err.errors
        })
    } else if (err.name == 'NotFound') {
        return res.status(404).json({
            errors: err.errors
        })
    } else if (err.name == 'Unauthorized') {
        return res.status(403).json({
            errors: err.errors
        })
    } else if (err.name == 'JsonWebTokenError') {
        return res.status(500).json({
            errors: err.errors
        })
    } else {
        console.log(err)
        return res.status(500).json(err)
    }
}

module.exports = errorHandler