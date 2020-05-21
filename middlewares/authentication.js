"use strict"

const {verifyToken} = require('../helpers/jwt.js');
const {User} = require("../models");

function authentication(req, res, next){
    let token = req.headers.token;

    try{
        let decoded = verifyToken(token);
        let {id} = decoded
        User
            .findByPk(id)
            .then(result => {
                if(result){
                    req.currentUserId = id
                    next()
                }
                else{
                    throw{
                        msg: "Please login first",
                        code: 401
                    }
                }
            })
            .catch(err => {
                throw err
            })
    }
    catch(err){
        next(err)
    }
}
module.exports = authentication;