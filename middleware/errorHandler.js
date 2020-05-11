function errorHandler(err, req, res , next){
    console.log(err)
    if(err.name == 'JsonWebTokenError'){
        res.status(401).json({msg : 'Login first'})
    }else if(err.name == 'SequelizeValidationError'){
        res.status(400).json({error : err.msg})
    }else{
        res.status(err.code || 500).json({error : err.msg})
    }
}

module.exports = errorHandler;