let {Cart, Product, User} = require('../models')
var nodemailer = require('nodemailer');
var CronJob = require('cron').CronJob;
let delivery =  function (CartId) {
  Cart.findOne({
    include: [Product, User],
        where: {
          idCart: CartId,
        }
    })
    .then((result) => {
      let email = result.dataValues.User.dataValues.email
      let arival = result.dataValues.updatedAt.getDate() -1 + result.dataValues.cour
      let msg = `Barang Anda ${result.dataValues.Product.dataValues.name} Akan sampai pada Tanggal ${arival + 1} Pastikan Anda Ada di Rumah`
      var job = new CronJob(`0 0 0 ${arival} * *`, function() {
        send(email, msg)
        job.stop();
      }, null, true, 'Asia/Jakarta');
      job.start();
      let msg2 = 'Terimakasih, Kami akan memberitahu bila Barang akan sampai, happy Shoping'
      var job2 = new CronJob(`* * * * * *`, function() {
        send(email, msg2)
        job2.stop();
      }, null, true, 'Asia/Jakarta');
      job2.start();
    })
}

function send(to, text) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pairprojectgroup5@gmail.com',
      pass: 'pairproject5!'
    }
  });
  
  var mailOptions = {
    from: 'pairprojectgroup5@gmail.com',
    to: to,
    subject: `Order Arival`,
    text: text
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = {delivery}
