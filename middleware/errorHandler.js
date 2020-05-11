function errorHandler(err, req, res , next){
    console.log(err)
    if(err.name == 'JsonWebTokenError'){
        res.status(401).json({msg : 'Login first'})
    }else{
        res.status(err.code || 500).json({error : err.msg})
    }
}

module.exports = errorHandler;