const {Customer_detail,Transaction,Product} = require("../models")
class Controller{

    static addNew(req,res,next){
        let data={
            name:req.body.name,
            address:req.body.address,
            CustomerId:req.currentUserId
        }
        Customer_detail.create(data)
        .then(result=>{
            let payload ={
                result
            }
            res.status(201).json(payload
            )
        })
        .catch(err=>{
            console.log(err);
            
            next(err)
        })
    }
    static Edit(req,res,next){
        let data={
            name:req.body.name,
            address:req.body.address,
            CustomerId:req.currentUserId
        }
        
        Customer_detail.update(data,{
            where:{
                id:req.params.id
                }
            })
        .then(result=>{
            res.status(201).json({
                msg:"Update Success"
            })
        })
        .catch(err=>{
            console.log(err);
            
           next(err)
        })
    }
    static delete(req,res){
       Transaction.findOne({
           where:{
               Customer_detailsId:req.params.id
           }})
           .then(reponse=>{
               if(reponse.data.length > 0) {

                   Customer_detail.destroy({
                       where:{
                           id:req.params.id
                       }
                   })
                   .then(result=>{
                       console.log(result);
                       
                       res.status(201).json({
                           msg:"Delete Success"
                       })
                   })
                   .catch(err=>{
                   next(err)
                   })
               }else {
                   res.status(400).json({
                       msg:"alamat Tidak dapat di Hapus"
                   })
               }
           })
        
    }
    static viewpending(req,res){
        Customer_detail.findAll({
            where:{
                CostumersId:req.currentUserId
            },
            include:[{
                models:"Product",
                include:[{
                    models:"Transaction",
                    where:{
                        status:"Pending"
                    }
                }]
            }]
        })
        .then(result=>{
            res.status(201).json({data:result})
        })
        .catch(err=>{
           next(err)
        })
    }

    static viewall(req,res,next){
        Customer_detail.findAll({
            where:{
                CustomerId:req.currentUserId
            }
        })
        .then(result=>{
            res.status(201).json({data:result})
        })
        .catch(err=>{
           next(err)
        })
    }

    
}
module.exports = Controller
