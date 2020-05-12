module.exports = (err, req, res, next) => {
    if (err.name == 'Bad Request') {
        res.status(400).json({
            code: 400,
            type: 'Bad Request',
            message: err.errors
        })
    } else if (err.name == 'SequelizeValidationError') {
        const errors = err.errors.map(el => ({
            message: el.message
        }));
        res.status(400).json({
            code: 400,
            type: 'Bad Request',
            message: errors
        })
    } else if (err.name === 'JsonWebTokenError') {
        res.status(401).json({
            code: 401,
            type: 'Unauthorized',
            message: `Please login first`
        })
    } else if(err.name === 'Not Found') {
        res.status(404).json({
            code: 404,
            type: 'Not Found',
            message: err.errors
        })
    } else if(err.name === 'Unauthorized') {
        res.status(401).json({
            code: 401,
            type: 'unauthorized',
            message: err.errors
        })
    } else if(err.name === 'Internal Server Error') {
        res.status(500).json({
            code: 500,
            type: 'Internal Server Error',
            message: err.message
        })
    }
}