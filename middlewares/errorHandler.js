function errorHandler(err, req, res, next){
    console.log("======", err, "<====== ini error dari errorHandler")
    if(err.name == "SequelizeValidationError"){
        const errors = err.errors.map(el => ({
            message : el.message
        }))
        return res.status(400).json({
            errors
        })
    }
    else if (err.name == 'SequelizeUniqueConstraintError'){
        return res.status(400).json({
            message : `${err.errors[0].value} already exists`
        })
    }
    else if(err.message == "Unauthorized request"){
        return res.status(400).json({
            errors: err.error
        })
    } 
    //buat error handler untuk err.name == sequelize unique constraint error
    else if(err.message == "BadRequest"){
        return res.status(400).json({
            error: err.error
        })
    } else if(err.message == "InternalServerError" && err.error == 'User Not Found'){
        return res.status(404).json({
            message: "Internal Server Error",
            error: err.error
        })
    }else if(err.name == "Internal Server Error" && err.error[0].message.name == 'JsonWebTokenError'){
        return res.status(500).json({
            message: "InternalServerError",
            error: 'JWT Token malformed/does not exist. Please sign in first'
        })
    } else {
        return res.status(500).json({
            message: "InternalServerError",
            error: err
        })
    }
}

module.exports = errorHandler