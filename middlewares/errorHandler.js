module.exports = (err, req, res, next) => {
    if (err.name == 'Bad Request') {
        res.status(400).json({
            code: 400,
            type: 'Bad Request',
            message: err.errors
        })
    } 
}