module.exports = (err, req, res, next) => {
    console.log(err)
    if(err.name == 'SequelizeValidationError') {
        let newErr = []
        err.errors.forEach(el => {
            if(el.message == 'Validation len on name failed') {
                newErr.push('Please input name with minimum 3 characters')
            } else if(el.message == 'Validation isEmail on email failed') {
                newErr.push('Please input the correct email')
            } else if(el.message == 'Validation len on password failed') {
                newErr.push('Please input password from 6-20 characters')
            } else if(el.message == 'Validation len on title failed') {
                newErr.push('Please input title from 3-40 characters')
            } else if(el.message == 'Validation isAfter on deadline failed') {
                newErr.push('Please input deadline which is greater than today')
            }
        })
        res.status(401).json({
            err: newErr
        })
    } else if(err.name == 'SequelizeUniqueConstraintError') {
        let newErr = []
        err.errors.forEach(el => {
            if(el.message == 'email must be unique') {
                newErr.push('Please make sure your email never registered here before')
            }
        })
        res.status(401).json({
            err: newErr
        })
    } else if(err.name == 'JsonWebTokenError'){
        res.status(400).json({
            err: 'please login first'
        })
    } else if(err.code) {
        res.status(err.code).json({
            err: err.msg
        })
    } else {
        res.status(500).json({
            msg: 'internal server error',
            err: err
        })
    }
}