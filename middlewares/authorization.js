const { User } = require("../models/index.js")

function authorization(req,res,next){
    User.findOne({
        where: {
            id : req.currentUserId
        }
    })
    .then(result => {
        if(result.role == 'admin') {
            return next() 
        } else {
            //bukan admin, gak boleh masuk
           return next({
                name:"Unauthorized", 
                error: [{message: "User unauthenticated"}]
            })
        }
    })
    .catch(error => {
        return next({
            name: "Internal Server Error",
            error: [{message: error}]
        })
    })
}

module.exports = authorization