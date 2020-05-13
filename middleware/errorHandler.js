function errorHandler(err, req, res , next){
    if(err.name == 'JsonWebTokenError'){
        res.status(401).json({msg : 'Login first'})
    }else if(err.name == 'SequelizeValidationError'){
        res.status(400).json({error : err.message})
    }else{
        res.status(err.code || 500).json({error : err.message})
    }
}

module.exports = errorHandler;