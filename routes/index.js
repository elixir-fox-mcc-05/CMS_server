const router = require('express').Router();
const userRouter = require('./user.js');
const productRouter = require('./product.js');
const categoryRouter = require('./category.js');

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'CMS Server is running'
  })
});
router.use('/', userRouter);
router.use('/products', productRouter);
router.use('/categories', categoryRouter);

module.exports = router;
