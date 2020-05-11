"use strict";
const {User} = require("../models");
const {Role} = require("../models");

function Authorization (req, res, next){
    const id = req.currentUser;
    User
        .findByPk(id, {
            include : Role
        })
        .then(user => {
            if(user.Role.name === "admin"){
                next();
            } else {
                return next({
                    type : "Unauthorized",
                    code : "401",
                    msg : "You are not authorized to use this feature"
                });
            }
        })
        .catch(err => {
            return next(err);
        });
}