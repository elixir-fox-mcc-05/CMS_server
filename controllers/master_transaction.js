const {Master_transaction} = require("../models")
class Controller{

    static addmaster(req,res,next){
        let data={
            number_trans: +req.body.number_trans,
            total_price: +req.body.total_price,
            trasaction_date: new Date()
        }
        
        Master_transaction.create(data)
        .then(result=>{
            
            res.status(201).json(result)
        })
        .catch(err=>{
            console.log(err)
            next(err)
        })
    }
    
    
    
}
module.exports = Controller
