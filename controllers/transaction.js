const {Trans,Product,Master_transaction} = require("../models")
const nodemailer = require("nodemailer")
class Controller{

    static addCart(req,res,next){
        let data={
            ProductId:req.body.id,
            CustomerDetailId:req.headers.idalamat,
            MasterTransactionId:1,
            price:req.body.price,
            status:"Pending",
            payment_method:"Pending"
        }
        Trans.create(data)
        .then(result=>{
            let payload ={
                result
            }
            res.status(201).json(payload
            )
        })
        .catch(err=>{
            console.log(err)
            next(err)
        })
    }
    
    static confirm(req,res,next){
       Trans.findAll({
           where:{
            CustomerDetailId: +req.body.id_alamat_default,
            status:'Pending'
           }
       })
       .then(result=>{
           console.log('Decrement----',  result);
           for (const i in result ) {
               let proid = result[i].dataValues.ProductId
               Product.decrement('stock', { where: { id: proid}});
               console.log('yesy----',  result[i].dataValues.ProductId);
            }
       
       })
        
        Trans.update({
            MasterTransactionId:req.body.masterid,
            status:'Done'
        },{
            where:{
                CustomerDetailId: req.body.id_alamat_default
                }
            })
        .then(result=>{
            console.log(result)
        })
        .catch(err=>{
            console.log(err);
            
           next(err)
        })
    }

    static mail(req,res){
           let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'irwanlearn@gmail.com',
                pass: 'Irwanlearn1ng1'
            }
            });

            let mailOptions = {
            from: 'irwanlearn@gmail.com',
            to: req.body.email,
            subject: `Transaksi di G-Ecommer dgn no Transaksi : ${req.body.number_trans} selesai`,
            text: `Terima kasih anda telah berbelanja di G-Ecommers sebesar Rp. ${req.body.total_price} `
            };

            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
            });
    }

    static delete(req,res){
       Trans.destroy({
           where:{
               ProductId:req.body.id,
               status:'Pending',
               CustomerDetailId: req.headers.idalamat
           },
           limit:1
        })
           .then(reponse=>{
                res.status(201).json({
                    msg:"Delete Success"
                })
           })
        
    }
    static viewpending (req,res) {
        Trans.findAll({
            where:{
                CustomerDetailId: req.headers.idalamat,
                status: 'Pending'
                },
                include:["Product"]
        })
        .then(result=>{
            res.status(201).json({
                data:result
            })
        })
        .catch(err=>{
            console.log(err);
            
        })
    }
   
    
}
module.exports = Controller
