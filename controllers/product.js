const {Product} = require("../models")
const Sequelize = require('sequelize')
class Controller{

    static addNew(req,res,next){
        let data={
            name : req.body.name,
            image_url:req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
       console.log('*******dari product controller*******',data);
       
        Product.create(data)
        .then(result=>{
            let payload ={
                id:result.id,
                name:result.name,
                price:result.price,
                stock:result.stock
            }
            res.status(201).json(payload
            )
        })
        .catch(err=>{
            console.log('****err dari product controller',err);            
            next(err)
        })
    }
    static Edit(req,res,next){
        let data={
            name : req.body.name,
            image_url:req.body.image_url,
            price: +req.body.price,
            stock: +req.body.stock
        }
        
        Product.update(data,{
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
    static delete(req,res,next){
        Product.destroy({
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
    }
    static viewall(req,res,next){       
        Product.findAll()
        .then(result=>{
            res.status(201).json({data:result})
        })
        .catch(err=>{
           next(err)
        })
    }

    static viewallcustomer(req,res){
        console.log('======');
        
        const Op = Sequelize.Op
        Product.findAll({
            where:{
                stock:{
                    [Op.gt]: 0
                }
            }})
        .then(result=>{
            res.status(201).json({data:result})
        })
        .catch(err=>{
           next(err)
        })
    }

    static viewone(req,res,next){
        Product.findByPk(req.params.id)
        .then(result=>{         
                          
            res.status(201).json({data:result})
        })
        .catch(err=>{
           next(err)
        })
    }

    static decrement(req,res,next){
        Product.findByPk(req.params.id)
        .then(result=>{         
                          
            res.status(201).json({data:result})
        })
        .catch(err=>{
           next(err)
        })
    }
    
}
module.exports = Controller
