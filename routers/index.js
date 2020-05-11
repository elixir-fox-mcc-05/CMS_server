const router = require('express').Router()
const product = require('./products')
router.get('/', (req, res) => {
  res.send('OK')
})

router.use('/products', product)

module.exports = router