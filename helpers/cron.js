let {Cart} = require('../models')
var CronJob = require('cron').CronJob;
let delivery =  function () {
  var arival = new Date().getDate() + 2
  var job = new CronJob(`26 * * * *`, function() {
    console.log('test');
  }, null, true, 'Asia/Jakarta');
  job.start();
}

module.exports = {delivery}
