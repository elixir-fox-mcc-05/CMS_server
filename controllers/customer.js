const { Customer,Customer_detail } = require('../models');
const {generateToken,verify} = require('../helpers/jwt');
const {Decrypt} = require('../helpers/bcrypt')

class Controller {
  static register(req, res, next) {
    const { email, password } = req.body;
    Customer.create({
      email,
      password
    })
      .then(response => {
        const payload = {
          id: response.id,
          email: response.email
        };
        Customer_detail.create({
            name:"default",
            address:"default",
            CustomerId:response.id
        })
        .then(result=>{
           let token = generateToken(payload)
            res.status(201).json({
              token:token,
              idalamat:result.id
            });
        })
      })
      .catch(err => {
        console.log(err)
        next(err);
      });
  }

  static login(req, res, next) {
    const { email, password } = req.body;
    console.log(email, password);
    
    Customer.findOne({
      where: {
        email: email
      }
    })
      .then(result => {
        console.log(result);
        if (result) {
          let compare = Decrypt(password,result.password)
          console.log(compare);
          
          if(compare){
              let payload={
                  id:result.id,
                  email:result.email
              }
              
              let token = generateToken(payload)
              console.log(token);
              Customer_detail.findOne({
                where:{
                  CustomerId: payload.id,
                  name:'default'
                }
              })
              .then(address => {
                return res.status(201).json({
                    token:token,
                    idalamat: address.id
                })

              })

              
          }
          else{
             return res.status(404).json({
                  msg:"Email/password not found"
              })
          }
        } else {
          return res.status(404).json({
            msg:"Email/password not found"
        })
        }


        
        // const token = jwt.sign(payload, process.env.SECRET);
        // return res.status(200).json({
        //   token
        // });
      })
      .catch(err => {
        next(err);
      });
  }
}
module.exports = Controller;
