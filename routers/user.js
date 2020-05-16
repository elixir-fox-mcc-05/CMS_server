let router = require('express').Router()
let userController = require('../controllers/user')

router.get((req, res) => {
  res.send('HEROKUUU')
}) 
router.post('/register', userController.register)
router.post('/login', userController.login)

module.exports = router