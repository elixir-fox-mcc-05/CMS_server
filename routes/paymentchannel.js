const router = require('express').Router();
const PaymentChannelController = require('../controllers/PaymentChannelController.js');

router.get('/', PaymentChannelController.findAll);

module.exports = router;