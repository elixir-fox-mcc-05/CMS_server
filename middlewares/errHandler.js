module.exports = (err, req, res, next) => {
    if(err.name == "SequelizeValidationError"){
        const errors = err.errors.map(el => ({
            message: el.message
        }))
        return res.status(400).json({
            name: 'BadRequest',
            errors
        })
    }
    else if(err.name == `BadRequest`){
        return res.status(400).json({
            name: `BadRequest`,
            errors: err.errors
        })
    }
    else if(err.name == 'SequelizeUniqueConstraintError'){
        return res.status(400).json({
            name: `BadRequest`,
            errors: [{
                message: err.message
            }]
        })
    }
    else {
        return res.status(500).json({
            name: `InternalServerError`,
            errors: [{
                message: err.message
            }]
        })
    }
}