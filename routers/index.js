const router = require('express').Router()
const product = require('./products')
const user = require('./user')

router.get('/', (req, res) => {
  res.send('OK')
})
router.use('/', user)
router.use('/products', product)

module.exports = router