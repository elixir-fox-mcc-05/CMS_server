function errorHandler(err, req, res , next){
    if(err.name == 'JsonWebTokenError'){
        res.status(401).json({message : 'Login first'})
    }else if(err.name == 'SequelizeValidationError'){
        res.status(400).json({message : err.message})
    }else{
        res.status(err.code || 500).json({error : err.message})
    }
}

module.exports = errorHandler;