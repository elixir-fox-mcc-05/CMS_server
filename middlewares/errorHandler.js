function errorHandler(err, req, res , next){
    // console.log(err)

    if (err.name == 'JsonWebTokenError') {
        res.status(401).json({message : 'Login first'})
    }
    else if (err.name == 'SequelizeValidationError' || err.name == 'SequelizeUniqueConstraintError') {
        // console.log(err.message)
        res.status(400).json({error : err.message})
    }
    else {
        res.status(err.code || 500).json({error : err.message})
    }
}

module.exports = errorHandler;