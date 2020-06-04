let { verifyToken } = require('../helpers/jwt')
let { User } = require('../models/index')

function authentification (req, res, next) { 
  // console.log(req.headers.access_token)
  let decode = verifyToken(req.headers.access_token)
  // console.log(decode)
    try{
        User.findOne({
            where:{
                id:decode.id
            }
        })
        .then(result=>{
          req.currentUserId = result.id
          return next()
        })
        .catch(err=>{
          console.log(err);
            return res.status(404).json({
                'type':'Not found',
                'msg':"User not Found"
            })
        })
    }catch(err){
      console.log(err);
        return res.status(401).json({
            'type':'Unauthorized',
            'msg':"Unauthorized"
        })
    }
    
}


module.exports = {authentification}