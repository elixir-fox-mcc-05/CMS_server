const {Product} = require('../models')
function Author(req,res,next){
    Product.findByPk(req.currentUserId)
    .then(result=>{
        return next()
    })
    .catch(err=>{
        return res.status(401).json({
            'type':'Unauthorized',
            'msg':"Unauthorized"
        })
    })
}
module.exports = Author