let {Cart} = require('../models')
var CronJob = require('cron').CronJob;
var job = new CronJob('* * * * * *', function() {
  Cart.findAll()
  .then((result) => {
    console.log(result);
  }).catch((err) => {
    
  });
  
}, null, true, 'Asia/Jakarta');
job.start();