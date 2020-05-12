'use strict'

const { User, Product } = require(`../models`)
const { readToken } = require(`../helpers/jwt`)


function authenticate( req, res, next) {
    if(req.headers.cmsaccesstoken) {
        const { id, role } = readToken(req.headers.cmsaccesstoken);
        User.findByPk(id)
            .then(result => {
                if(result){
                    req.UserId = id;
                    req.Role = role
                    next ();
                } else {
                    res.status(400).json({
                        error : `Invalid token supplied or user no longer exists`
                    })
                }
            })
            .catch( err => {
                res.status(500).json({
                    error : err.message
                })
            })
    } else {
        res.status(401).json({
            error : `not logged in`
        })
    }
}

function authorize ( req, res, next) {
    if(req.Role ===`Admin`) {
        next()
    } else if(req.Role ===`seller`) {
        Product.findOne({
            where : {
                id : Number(req.body.id),
                UserId : req.UserId
            }
        })
            .then( result => {
                if(result){
                    next()
                } else {
                    res.status(401).json({
                        error : `item not found, or it does not belong to you`
                    })
                }
            })
            .catch( err => {
                res.status(500).json({
                    error : err.message
                })
            })

    } else {
        res.status(400).json({
            error : `This feature is restricted to sellers and admin`
        })
    }
}

function restricted ( req, res, next) {
    if(req.Role ===`Admin`) {
        next()
    } else {
        res.status(400).json({
            error : `This feature is restricted for admin only`
        })
    }
}

module.exports =  {
    authenticate,
    authorize,
    restricted
}