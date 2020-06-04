module.exports = (err, req, res, next) => {
    if(err.name == 'JsonWebTokenError'){
        res.status(401).json({
            error: `please login first`
        })
    } else if(err.name == 'SequelizeValidationError'){
        // console.log(err.message)
        res.status(400).json({
            error: err.message
        })
    } else {
        res.status(err.code || 500).json({
            error: err.message
        })
    }
}