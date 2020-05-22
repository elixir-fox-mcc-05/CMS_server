"use strict"

const {Todo} = require("../models");

function authorization(req, res, next){
    let {id} = req.params

    Todo.findByPk(id)
        .then(result => {
            if(result){
                if(result.UserId == req.currentUserId){
                    next();
                }
                else{
                    return next({
                        name: "BadRequest",
                        errors: [{message: "Invalid email or password"}]
                    })
                }
            }
            else{
                return next({
                    name: "NotFound",
                    errors: [{message: "Not found"}]
                })
            }
        })
        .catch(err => {
            return next({
                name: "InternalServerError",
                errors: [{message: err}]
            });
        })
}
module.exports = authorization;