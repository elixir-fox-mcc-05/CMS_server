"use strict";

module.exports = (err, req, res, next) => {
    if(err.code) {
        return res.status(err.code).json(
            err
        );
    } else if(err.name){
        let report = {
            type : "Bad Request",
            code : 400
        };
        if (err.name === "SequelizeValidationError") {
            if(err.errors[0].path === "email"){
                report.msg = "Your email doesn't valid, please use an email";
            } else if(err.errors[0].path === "password"){
                report.msg = "Password must be from 8 - 50 characters";
            } else if(err.errors[0].path === "name"){
                report.msg = "Name cannot be empty";
            } else if(err.errors[0].path === "image_url"){
                report.msg = "Image Url cannot be empty";
            } else if(err.errors[0].path === "price") {
                report.msg = "Price cannot be empty";
            } else if(err.errors[0].path === "stock") {
                report.msg = "Stock cannot be empty";
            }
            return res.status(400).json(report);
        } else if (err.name === "SequelizeUniqueConstraintError"){
            report.msg = "Your email already exist";
            return res.status(400).json(report);
        }
    } else {
        return res.status(500).json({
            type : "Internal Server Error",
            code : 500,
            msg : "Something Went Wrong"
        });
    }
};