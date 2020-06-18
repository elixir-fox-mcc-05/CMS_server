let {verifyToken} = require("../helpers/jwt.js")
const { User } = require("../models/index.js")

function authentication(req,res,next){
    try {
        let decoded = verifyToken(req.headers.access_token)
        User.findOne({where:{
            id: decoded.id
        }})
        .then(result => {
            // console.log("$$$$$$", result, "$$$$$$")

            //berhasil  : data orang sign in ketemu di db
            //errors    : error kalau user gak ketemu, kalau token salah, kalau findOne gagal proses
            if(result){
                // jika ketemu, tampung id-nya di req.currentUserId untuk penggunaan ke depan. 
                // Kemudian next ke todo user
                // req.currentUserRole = result.role // payload di userController sign in method harusnya mengandung id, email, dan role setelah log in
                req.currentUserId = result.id
                return next()
            } else {
                //error : kalau user tidak ketemu
                return next({
                    message:"InternalServerError", 
                    error: "User Not Found"
                })
            }
        })
        .catch(error => {
            console.log("authentication error", error)
            //error : kalau prosesfindOne gagal karena user tidak registered atau jwt malformed?
            return next({
                name:"Unauthorized", 
                error: [{message: "User unauthenticated"}]
            })
        })
    }
    catch(err){
        // console.log("Ini error-nya: ", err)
        //error: gagal decode karena tokennya malformed/tidak pas dengan secret string
        return next({
            name: "Internal Server Error",
            error: [{message: err}]
        })
    }
}

module.exports = authentication