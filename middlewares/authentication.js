"use strict";
const {verifyToken} = require("../helpers/jwt");
const {User} = require("../models");

function Authentication(req, res, next){
    const {token} = req.headers
    if(!token) {
        return next({
            type : "Bad Request",
            code : "400",
            msg : "Please Login First"
        });
    }
    try {
        const decode = verifyToken(token);
        const {id} = decode;
        User
            .findByPk(id)
            .then(user => {
                if (user){
                    req.currentUser = user.id;
                    next();
                } else {
                    return next({
                        type : "Bad Request",
                        code : "400",
                        msg : "Please Login First"
                    });
                }
            });
    } catch (err) {
      console.log(err)
        return next(err);
    }
}
module.exports = Authentication;