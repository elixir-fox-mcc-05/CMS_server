const { User } = require('../models');
const {generateToken,verify} = require('../helpers/jwt');
const {Decrypt} = require('../helpers/bcrypt')

class Controller {
  static register(req, res, next) {
    const { email, password } = req.body;
    User.create({
      email,
      password
    })
      .then(response => {
        const payload = {
          id: response.id,
          email: response.email
        };
        res.status(201).json(payload);
      })
      .catch(err => {
        next(err);
      });
  }

  static login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({
      where: {
        email
      }
    })
      .then(result => {
        
        let compare = Decrypt(password,result.password)
        console.log(compare);
        
        if(compare){
            let payload={
                id:result.id,
                email:result.email
            }
            
            let token = generateToken(payload)
            console.log(token);
            return res.status(200).json({
                
                id:result.id,
                token:token
            })
            
        }
        else{
           return res.status(401).json({
                msg:"username/password not found"
            })
        }


        
        const token = jwt.sign(payload, process.env.SECRET);
        return res.status(200).json({
          token
        });
      })
      .catch(err => {
        next(err);
      });
  }
}
module.exports = Controller;
