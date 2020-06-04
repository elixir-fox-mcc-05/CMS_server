const { PaymentChannel } = require('../models');

class PaymentChannelController {
  static findAll (req, res, next) {
    PaymentChannel.findAll()
      .then(result => {
        res.status(200).json({
          PaymentChannel: result
        });
      })
      .catch(err => {
        return next(err);
      })
  }
}

module.exports = PaymentChannelController;