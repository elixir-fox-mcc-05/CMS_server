const {verify} = require('../helpers/jwt')
const {Customer} = require('../models')
function Authen(req,res,next){
    let decode = verify(req.headers.token)
    try{
        Customer.findOne({
            where:{
                id:decode.id
            }
        })
        .then(result=>{
            
            if(result) {
                req.currentUserId = result.id
                console.log('authen sucess');
                return next()
            }else {
                res.status(401).json({
                    'type':'Unauthorized',
                    'msg':"Unauthorized"
                })
            }
        })
        .catch(err=>{            
            return res.status(401).json({
                'type':'Not found',
                'msg':"User not Found"
            })
        })
    }catch(err){
        return res.status(401).json({
            'type':'Unauthorized',
            'msg':"Unauthorized"
        })
    }
    
}

module.exports = Authen

