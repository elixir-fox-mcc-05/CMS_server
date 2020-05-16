module.exports = {
    errHandler: (err, req, res, next) => {
        if(err.name === 'JsonWebTokenError') {
            res.status(401).json({
                error: 'You have to login to access this page'
            })
        } else if(Array.isArray(err.errors)) {
            let error = err.errors.map(error => {
                return error.message
            })
            const errorMsg = error.join(', ')
            res.status(400).json({
                error: errorMsg
            })
        } else {
            res.status(err.code || 500).json({
                error: err.msg || err.message
            })
        }
    }
}