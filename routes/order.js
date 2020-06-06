const router = require('express').Router();
const OrderController = require('../controllers/OrderController.js');
const authentication = require('../middlewares/authentication.js');

router.use(authentication)
router.get('/', OrderController.findAll);
router.post('/', OrderController.addOrder);

module.exports = router;