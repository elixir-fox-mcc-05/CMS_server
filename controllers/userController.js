const {User} = require('../models')
const {verifyToken, generateToken} = require('../helpers/jwt')
const {encrypt, compare} = require('../helpers/bcrypt')

class UserController{
    static login(req,res){
        const {email , password} = req.body

        User
            .findOne({where:{email : req.body.email}})
            .then(data => {

                if(data){

                    if (compare(password, data.password)){

                        let token = generateToken({
                                        id : data.id,
                                        email : data.email,
                                        password : data.password
                                    })
                        res.status(200).json({token : token, first_name: data.first_name, last_name: data.last_name, roles: data.roles})

                    }else {

                        res.status(400).json({error : 'invalid password'})

                    }
                }else {

                    res.status(400).json({error : 'invalid email'})

                }
                
                })
                // .catch(next)
            .catch(err => {
                            res.status(500).json({error : err.message})               
                            })
    }

    static register(req,res){
        let {first_name,last_name,email,password,roles} = req.body
        // let roles = 'admin'

        User
            .create({first_name,last_name,email,password,roles})
            .then(data => {
                res.status(201).json({
                    id: data.id,
                    first_name : data.first_name,
                    last_name : data.last_name,
                    email : data.email,
                    roles : data.roles
                })
            })
            .catch(err => {
                // console.log(err.message)
                let errorfix = err.message
                if(errorfix.includes(',')){
                    errorfix = errorfix.split(',')
                    for (let i=0 ; i <errorfix.length ; i++){
                        errorfix[i] = errorfix[i].replace('Validation error: ','').replace('\n','')
                        if (errorfix[i].charAt(errorfix[i].length-1) == ' '){
                            errorfix[i] = errorfix[i].slice(0, -1); 
                        }
                    }

                }else {
                    errorfix = errorfix.replace('Validation error: ','')
                }
                res.status(400).json({
                    error : errorfix
                })
                
                
            })
    }

    static googleLogin(req,res){
        let google_token = req.headers.google_token;
            let email = null;
            let newUser = false;
            let first_name = null;
            let last_name = null
            let roles = null
            // console.log(google_token)
            googleVerification(google_token)
              .then(payload => {
                // console.log(payload)
                email = payload.email;
                first_name = payload.given_name;
                last_name = payload.family_name;
                roles = 'costumer'
                return User
                  .findOne({
                    where: {
                      email
                    }
                  })
              })
              .then(user => {
                // console.log('errr')
                if (user) {
                  return user;
                } else {
                  newUser = true;
                  
                  return User
                    .create({
                        first_name,
                        last_name,
                      email,
                      password: process.env.DEFAULT_GOOGLE_PASSWORD,
                      roles
                    });
                }
              })
              .then(user => {
                let code = newUser ? 201 : 200;
        
                res.status(code).json({
                  token :  generateToken({data : {
                                                id: user.id,
                                                email: user.email
                                              }})
                });
              })
              .catch(err => {
                // console.log('errrr')
                next(err);
              })
    }
}

module.exports = UserController